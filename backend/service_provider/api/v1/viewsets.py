import base64
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Subquery, OuterRef, Exists
from booking.models import ServicesTimeSlots

from service_provider.api.v1.serializers import (
    EmployeeProfileSerializer,
    LiveTrackingSerializer,
    EmployeeCategorySerializer,
    EmployeeBookingRequestSerializer,
    EmployeeServiceTimeSerializer,
    EmployeeAvailableTimeSerializer,
    EmployeeProfileImageSerializer,
    AvailableTimeSlotSerializer
)
from home.api.v1.serializers import EmployeeServicesSerializer
from service_provider.models import LiveTracking, EmployeeAvailableTime, AvailableTimeSlots
from home.models import Category, Employee, EmployeeCategory, BookingRequest, ServiceTimeSlot
User = get_user_model()


class EmployeeProfileViewSet(ModelViewSet):
    serializer_class = EmployeeProfileSerializer
    queryset = Employee.objects.all()
    http_method_names = ["get", "patch", 'post']

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=True, methods=['post', 'get'])
    def set_employee_profile_picture(self, request, pk):
        partial = True
        instance = self.get_object()
        serializer = EmployeeProfileImageSerializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class LiveTrackingViewSet(ModelViewSet):
    serializer_class = LiveTrackingSerializer

    def get_queryset(self):
        return LiveTracking.objects.filter(employee__user=self.request.user)


class EmployeeServiceViewSet(ModelViewSet):
    serializer_class = EmployeeCategorySerializer

    def get_queryset(self):
        queryset = EmployeeCategory.objects.filter(employee__user=self.request.user)
        return queryset


class EmployeeBookingRequestViewSet(ModelViewSet):
    serializer_class = EmployeeBookingRequestSerializer
    queryset = BookingRequest.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(employee__user=self.request.user)
        status = self.request.query_params.get("status")
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def update(self, request, *args, **kwargs):
        b_id = kwargs["pk"]
        status = request.data["status"]
        if b_id:
            br = BookingRequest.objects.filter(id=b_id)
            br.update(status=status)
            # e_t = EmployeeAvailableTime.objects.filter(employee=br.employee, date=br.booking_date,
            #                                            start_time=br.booking_time)

            if status == "completed":
                for b in br:
                    employee_time = EmployeeAvailableTime.objects.filter(employee=b.employee, date=b.booking_date,
                                                               start_time=b.booking_time)
                    if employee_time:
                        employee_time.update(status="available")
        return Response("status update successful")


class EmployeeBookingRequestPendingViewSet(ModelViewSet):
    serializer_class = EmployeeBookingRequestSerializer
    queryset = BookingRequest.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(employee__user=self.request.user, status="created")
        return queryset


class EmployeeBookingRequestAcceptedViewSet(ModelViewSet):
    serializer_class = EmployeeBookingRequestSerializer
    queryset = BookingRequest.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(employee__user=self.request.user, status="accepted")
        return queryset


class EmployeeServiceTimeViewSet(ModelViewSet):
    serializer_class = EmployeeServiceTimeSerializer
    queryset = ServiceTimeSlot.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(employee_category__employee__user=self.request.user)
        return queryset


class EmployeeAvailableTimeViewSet(ModelViewSet):
    queryset = EmployeeAvailableTime.objects.all()
    serializer_class = EmployeeAvailableTimeSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = EmployeeAvailableTime.objects.filter(employee__user=request.user)
        date = self.request.query_params.get("date")
        if date:
            queryset = queryset.filter(date=date)
        serializer = EmployeeAvailableTimeSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='employee_slots', url_name='employee_slots')
    def get_employee_slots(self, request, pk):
        employee_slots = EmployeeAvailableTime.objects.filter(employee=pk)
        serializer = EmployeeAvailableTimeSerializer(employee_slots, many=True)
        return Response(serializer.data)


class AvailableTimeSlotViewSet(ModelViewSet):
    queryset = AvailableTimeSlots.objects.filter(is_active=True)
    serializer_class = AvailableTimeSlotSerializer
    permission_classes = [IsAuthenticated]

    """
    This api will return time_slots with price from main Category model populated by Concierge User Type
    service_id is required in query_params to show price (taken from Category Model) with time_slots 
    """
    def list(self, request, *args, **kwargs):

        if request.query_params.get("service_id"):
            time_slots = None
            if request.query_params.get("booking_service_id"):
                time_slots = AvailableTimeSlots.objects.all() \
                    .annotate(service_price=Subquery(Category.objects.filter(id=request.query_params.get("service_id"))
                                                     .values("price")),
                              is_exists=Exists(ServicesTimeSlots.objects.filter(
                                  booking_service_id=request.query_params.get("booking_service_id"),
                                  booking_time_slot_id=OuterRef("id"))))
            else:
                time_slots = AvailableTimeSlots.objects.all()\
                    .annotate(service_price=Subquery(Category.objects.filter(id=request.query_params.get("service_id"))
                                                     .values("price")))

            serializer = AvailableTimeSlotSerializer(time_slots, many=True, context={"request": request})

            return Response(serializer.data)

        return Response({"error": "Kindly provide valid service_id first"})
