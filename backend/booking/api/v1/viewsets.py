import json
from datetime import datetime, date
from django.contrib.auth import get_user_model
from django.db.models import Q, F
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters
from booking.api.v1.serializers import BookingRequestCreateSerializer, BookingRequestSerializer, \
    BookingRequestServiceSerializer, BookingRequestUpdateSerializer, \
    BookingRequestServiceUpdateSerializer, BookingRequestPastServiceSerializer, BookingServiceDetailSerializer, \
    AllServicesSerializer
from booking.models import BookingRequest, BookingRequestServices, BookingRequestRecurring
from events.api.v1.viewsets import find_days_between
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
import django_filters

User = get_user_model()


class BookingRequestViewSet(ModelViewSet):
    # serializer_class = BookingRequestCreateSerializer
    queryset = BookingRequest.objects.prefetch_related("booking_service",
                                                       "booking_service__booking_recurring",
                                                       "booking_service__category",
                                                       "booking_service__time_slots_service__booking_time_slot",
                                                       "booking_service__employee").all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['status']

    # region "Custom Endpoint"

    # Endpoint to get all services in Booking Request
    @action(methods=['get'], detail=True, url_path='booking_service', url_name='booking_service')
    def get_booking_services(self, request, pk):
        booking_services = BookingRequestServices.objects.select_related("employee", "category").\
            prefetch_related("booking_recurring").filter(booking_request_id=pk)
        serializer = BookingRequestServiceSerializer(booking_services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Endpoint to get past services
    @action(methods=['get'], detail=False, url_path='past_services', url_name='past_services')
    def get_past_service(self, request, *args, **kwargs):
        user = self.request.user

        past_services = BookingRequestServices.objects.select_related("category", "employee").\
            filter(booking_request__user=user, booking_request__status='completed',
                   booking_request__booking_date__lte=date.today())\
            .all().order_by("-booking_request__booking_date")

        serializer = BookingRequestPastServiceSerializer(past_services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Endpoint to get past recurring services
    @action(methods=['get'], detail=False, url_path='recurring_services', url_name='recurring_services')
    def get_recurring_service(self, request, *args, **kwargs):
        user = self.request.user

        past_services = BookingRequestServices.objects.select_related("category", "employee"). \
            filter(booking_request__user=user, booking_request__status='completed', booking_request__booking_date__lte=date.today(),
                   is_recurring=True).all().order_by("-booking_request__booking_date")

        serializer = BookingRequestPastServiceSerializer(past_services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(methods=['get'], detail=True, url_path='service_recurring/<int:booked_service_id>',
    #         url_name='service_recurring')
    # def get_booked_service_detail(self, request, pk, **kwargs):
    #
    #     services_occurrence = BookingRequestRecurring.objects.filter(booking_service_id=pk)
    #     serializer = BookingRequestRecurringSerializer(services_occurrence, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    # endregion

    # region "Overrides"

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookingRequestCreateSerializer
        elif self.request.method == 'PUT' or self.request.method == 'PATCH':
            return BookingRequestUpdateSerializer
        else:
            return BookingRequestSerializer

    def create(self, request, *args, **kwargs):
        # save booking request
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({"message": "Booking Created"}, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        user = self.request.user

        if user.is_staff or user.is_superuser or user.role == 'concierge':
            return self.queryset.prefetch_related("booking_service").prefetch_related("booking_service__category").\
                prefetch_related("booking_service__employee").all()
        elif user.role == 'community designer' or user.role == 'employee':
            return BookingRequest.objects.prefetch_related('booking_service',
                                                           'booking_service__employee')\
                .filter(booking_service__employee__name=user).distinct()
        elif user.role == 'resident':
            bookings = self.queryset.prefetch_related("booking_service").prefetch_related("booking_service__category").\
                prefetch_related("booking_service__employee").filter(user=user)
            return bookings

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = BookingRequest.objects.get(id=kwargs['pk'])
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    # endregion


class BookingRequestServiceViewSet(ModelViewSet):
    queryset = BookingRequestServices.objects.select_related("employee", "category").\
        prefetch_related("booking_recurring").all()
    permission_classes = [IsAuthenticated]
    http_method_names = ["put", "patch"]

    # region "Overrides"

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return BookingRequestServiceUpdateSerializer
        else:
            return BookingRequestServiceSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', False)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Data updated successfully"}, status=status.HTTP_201_CREATED)

    # endregion


class CommunityDesignerBookingViewSet(ModelViewSet):
    queryset = BookingRequestServices.objects.all()
    serializer_class = BookingRequestServiceSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        if user.role == 'community_designer' or user.role == 'employee':
            instance = self.get_object()
            serializer = BookingServiceDetailSerializer(instance)
            return Response(serializer.data)
        return Response({'detail': 'Access Denied, must be access by community designer'}, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        user = self.request.user
        if user.role == 'community_designer' or user.role == 'employee':
            # get date from query_params

            if 'booking_date' not in request.query_params:
                return Response({"detail": "Kindly provide valid booking_date in url"})

            booked_date = request.query_params["booking_date"]

            # filter booking services which is >= from_date or >= end_date
            bookings = BookingRequestServices.objects.filter(
                Q(from_date__gte=booked_date) | Q(end_date__gte=booked_date), employee__user=request.user) \
                .prefetch_related("time_slots_service__booking_time_slot__start_time").values("id", "is_recurring", 'from_date', 'end_date',
                        employee_name=F("employee__name"),
                        category_name=F("category__name"),
                        category_image=F("category__image"),
                        booking_date=F("booking_request__booking_date"),
                        booking_time=F("time_slots_service__booking_time_slot__start_time"))

            # appended booking services data
            booking_data = []
            booking_events = []
            for booking in bookings:

                # check to see if booking is_recurring False
                if not booking['is_recurring']:
                    # append simple one_time booking data
                    booking_data.append(booking)

                    booking_events.append(BookingServiceEvents(
                            booking["id"],
                            booking["employee_name"],
                            booking["category_name"],
                            booking["category_image"],
                            booking["booking_date"],
                            booking["booking_time"]
                        ))

                # check to see if booking is_recurring True
                # then below method is used to get all weekday (Monday, Tuesday, etc.) dates
                # between two dates from Booking Services and
                # then check whether the user provided date is present in all weekday dates between two dates
                else:
                    weekdays = BookingRequestRecurring.objects.filter(booking_service=booking['id'])

                    # Iterate weekdays to get booking_weekday value
                    for i in weekdays:
                        date_start: date = booking['from_date']
                        date_end: date = booking['end_date']

                        weekday = i.booking_weekday

                        # send params to function (find_days_between)
                        # which will provide a list of weekday (0 = Monday, 1 = Tuesday, etc.) between two dates
                        dates = find_days_between(date_start, date_end, weekday)
                        date_obj = datetime.strptime(booked_date, '%Y-%m-%d').date()
                        if dates:
                            # filter to see if user provided date is present in function provided dates
                            booking_dates = list(filter(lambda d: d == date_obj, dates))

                            # if date is present then append booking recurring data
                            if len(booking_dates) > 0:
                                booking['booking_date'] = date_obj
                                booking['category_image'] = request.build_absolute_uri('/') + \
                                                            'media/' + booking['category_image']
                                booking_data.append(booking)
                                booking_events.append(BookingServiceEvents(
                                    booking["id"],
                                    booking["employee_name"],
                                    booking["category_name"],
                                    booking["category_image"],
                                    booking["booking_date"],
                                    booking["booking_time"]
                                ))

                                break

            # convert object collection to json string
            events = json.dumps([obj.__dict__ for obj in booking_events], default=str)
            # convert json string to json
            return Response(json.loads(events), status=status.HTTP_200_OK)

        return Response({'detail': 'Access Denied, must be access by community designer'}, status=status.HTTP_403_FORBIDDEN)

# region "class"


class BookingServiceEvents:
    def __init__(self, booking_id, employee_name, service_name, service_image, booking_date, booking_time):
        self.booking_id = booking_id
        self.employee_name = employee_name
        self.service_name = service_name
        self.service_image = service_image
        self.booking_date = booking_date
        self.booking_time = booking_time

# endregion


class AllServicesViewSet(ModelViewSet):
    queryset = BookingRequestServices.objects.all()
    serializer_class = AllServicesSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        status = request.query_params.get("status")
        search = request.query_params.get("search")
        if status is None:
            return Response("Kindly provide valid status in url")
        booking_services = self.queryset.filter(booking_request__status=status).annotate(
            service_image=F("category__image"),
            service_name=F("category__name"),
            booking_date=F("booking_request__booking_date"),
            booking_address=F("booking_request__address"),
            resident_name=F("booking_request__user__name"),
            designer_name=F("employee__name"),
        )
        if search:
            booking_services = booking_services.filter(Q(category__name__icontains=search) |
                                                       Q(booking_request__user__name__icontains=search) |
                                                       Q(employee__name__icontains=search))
        serializer = AllServicesSerializer(booking_services, many=True, context={"request": request})
        return Response(serializer.data)
