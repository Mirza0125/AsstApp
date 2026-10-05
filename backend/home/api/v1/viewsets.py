import datetime

from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q, F, Case, BooleanField, Value, When
from django_filters import rest_framework as rest_filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status, filters
from payments.models import UserSubscription
from django_filters.rest_framework import DjangoFilterBackend

from home.api.v1.serializers import (
    ServicesSerializer,
    EmployeeProfileSerializer,
    EmployeeReviewSerializer,
    EmployeeServicesSerializer,
    EmployeePhotoSerializer,
    BookingRequestSerializer,
    BannerSerializer,
    MessageSerializer,
    OnBoardSerializer,
    CustomerUpdateProfileSerializer,
    QuestionSerializer,
    OptionSerializer,
    AnswerSerializer,
    AddToBagSerializer,
    ServiceDetailSerializer,
    EmployeeCategorySerializer,
    ServiceSerializer,
    EmployeeReviewCreateSerializer,
)
from service_provider.api.v1.serializers import LiveTrackingSerializer
from home.models import Category, Employee, EmployeeCategory, EmployeePhoto, Review, BookingRequest, Banner, \
    Message, OnBoard, Question, Option, Answer, AddToBag, ServiceDetail, Service
from service_provider.models import EmployeeAvailableTime, LiveTracking
User = get_user_model()


class CategoryFilter(rest_filters.FilterSet):
    name = rest_filters.CharFilter(field_name="name", lookup_expr='icontains')

    class Meta:
        model = Category
        fields = ['name']


class ServicesViewSet(ModelViewSet):
    serializer_class = ServicesSerializer
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = CategoryFilter
    search_fields = ["name", "price"]

    def get_queryset(self):
        user = self.request.user
        request = self.request
        subscription = UserSubscription.objects.filter(user=self.request.user).first()

        category = None

        # if user type is resident, and he/she doesn't have any subscription then return error
        if not subscription and user.role == 'resident':
            return Response({"message": "Kindly get subscription first"})

        # if user type is admin and concierge then show all services
        if request.user.is_staff or request.user.is_superuser or request.user.role == 'concierge':
            category = Category.objects.all().values("id", "name", "price").order_by("-id")

        """
        If user type is resident and he/she has subscription then show services with is_allowed field
        to check whether a user is allowed to purchase this service is not. The admin will set in 
        SubscriptionBasedService model which service will be allowed to which subscription package
        """
        if subscription and user.role == 'resident':
            user_subscription = UserSubscription.objects.filter(user=self.request.user).first()

            # Method to make services is_allowed field True/False according to subscription
            category = Category.objects.all().annotate(
                is_allowed=Case(
                    When(service_category__subscription__stripe_price_id=user_subscription.subscription.stripe_price_id,
                         then=Value(True)),
                    default=Value(False),
                    output_field=BooleanField()
                )
            ).order_by("-id")

        # serializer = self.get_serializer(category, many=True)

        return category

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = Category.objects.get(id=kwargs["pk"])
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class EmployeeProfileViewSet(ModelViewSet):
    serializer_class = EmployeeProfileSerializer
    queryset = Employee.objects.none()

    def get_queryset(self):
        queryset = Employee.objects.prefetch_related("employee_category", ) \
            .select_related("user") \
            .all() \
            .annotate(client=Count('booking_employee', distinct=True))
        queryset = queryset.annotate(review=Avg('employee_review__rating'))
        service = self.request.query_params.get("service")
        alphabetical_sort = self.request.query_params.get('alphabetical_sort')
        rating_sort = self.request.query_params.get('rating_sort')
        repeated_customer = self.request.query_params.get('repeated_customer')
        if service:
            queryset = queryset.filter(employee_category__category_id=service)
            if alphabetical_sort == "A to z":
                queryset = queryset.order_by('name')
            if alphabetical_sort == "Z to a":
                queryset = queryset.order_by('-name')
            if rating_sort == "Highest to lowest":
                queryset = queryset.annotate(review=Avg('employee_review__rating')).order_by(
                    "-review")
            if rating_sort == "Lowest to highest":
                queryset = queryset.annotate(review=Avg('employee_review__rating')).order_by(
                    "review")

            if repeated_customer == "Highest to lowest":
                queryset = queryset.annotate(client=Count('booking_employee', distinct=True)).order_by(
                    "-client")
        return queryset

    @action(methods=['get'], detail=True, url_path='photo', url_name='photo')
    def get_photo(self, request, pk):
        instance = self.get_object()
        serializer = EmployeePhotoSerializer(EmployeePhoto.objects.filter(profile=instance), context={"request": request
                                                                                                      }, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='review', url_name='review')
    def get_review(self, request, pk):
        instance = self.get_object()
        serializer = EmployeeReviewSerializer(Review.objects.filter(employee=instance), context={"request": request},
                                              many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='emp_tracking', url_name='emp_tracking')
    def get_emp_tracking(self, request, pk):
        serializer = LiveTrackingSerializer(LiveTracking.objects.filter(employee_id=pk), context={"request": request},
                                            many=True)
        return Response(serializer.data)


class EmployeePhotoViewSet(ModelViewSet):
    serializer_class = EmployeePhotoSerializer
    queryset = EmployeePhoto.objects.all()
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "post"]

    def get_queryset(self):
        return self.queryset.filter(profile__user=self.request.user)

    def create(self, request, *args, **kwargs):
        data_list = []
        image = request.data['profile_image']
        for i in image:
            data = {'profile': request.data["profile"], 'profile_image': i}
            data_list.append(data)
        serialized = EmployeePhotoSerializer(data=data_list, many=True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeReviewViewSet(ModelViewSet):
    serializer_class = EmployeeReviewSerializer
    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return EmployeeReviewSerializer
        return EmployeeReviewCreateSerializer


class BookingRequestViewSet(ModelViewSet):
    serializer_class = BookingRequestSerializer
    queryset = BookingRequest.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get("status")
        queryset = self.queryset\
            .filter(Q(status=status) if status else Q(), user=self.request.user)\
            .select_related('employee', 'employee__user')\
            .prefetch_related('employee_category')\
            .annotate(avg_review=Avg('employee_category__employee__employee_review__rating'),
                      tip=F("employee_category__service_payment__tip"),
                      amount=F("employee_category__service_payment__amount")).distinct()
        return queryset

    @action(methods=['get'], detail=False, url_path='past_services', url_name='past_services')
    def get_past_service(self, request, *args, **kwargs):
        past_services = BookingRequest.objects.\
            filter(user=self.request.user, status='completed', booking_date__lt=datetime.date.today()).all()

        serializer = BookingRequestSerializer(past_services, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='cate_detail', url_name='cate_detail')
    def get_cate_detail(self, request, pk):
        instance = self.get_object()
        cate = instance.employee_category.category
        serializer = AnswerSerializer(Answer.objects.filter(user=self.request.user, question__category=cate),
                                      context={"request": request}, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        if 'employee_category' not in request.data:
            return Response({'message': 'Kindly provide valid employee category'})
        categories = request.data.pop("employee_category")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        serializer.instance.employee_category.add(*categories)

        data = {
            'date': serializer.data["booking_date"],
            'start_time': serializer.data["booking_time"],
            'employee': serializer.data["employee"],
        }
        EmployeeAvailableTime.objects.filter(**data).update(status="booked")

        add_to_bag = request.data.get("add_to_bag")
        if add_to_bag:
            AddToBag.objects.get(id=add_to_bag).delete()

        return Response({"status": 1}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        categories = []
        if 'employee_category' in request.data:
            categories += request.data.pop("employee_category")

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        serializer.instance.employee_category.add(*categories)

        return Response(serializer.data)


class BannerViewSet(ModelViewSet):
    serializer_class = BannerSerializer
    queryset = Banner.objects.all()


class EmployeeCategoryViewSet(ModelViewSet):
    serializer_class = EmployeeServicesSerializer
    permission_classes = [IsAuthenticated]
    queryset = EmployeeCategory.objects.all()

    # def get_queryset(self):
    #     queryset = self.queryset
    #     queryset = queryset.filter(employee__user=self.request.user)
    #     return queryset

    # This endpoint is to get all employees who are offering particular service
    @action(methods=['get'], detail=True, url_path='service', url_name='service')
    def get_employee(self, request, pk):
        employee = EmployeeCategory.objects.select_related("employee", "employee__user").filter(service=pk)
        serializer = EmployeeCategorySerializer(employee, many=True)
        return Response(serializer.data)


class MessageViewSet(ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        queryset = queryset.filter(Q(send_to=user) | Q(receive_by=user))
        return queryset


class OnBoardViewSet(ModelViewSet):
    serializer_class = OnBoardSerializer

    def get_queryset(self):
        queryset = OnBoard.objects.all()
        return queryset


class CustomerUpdateProfileViewSet(ModelViewSet):
    serializer_class = CustomerUpdateProfileSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "patch"]

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset

    @action(methods=['patch'], detail=True,)
    def set_profile_picture(self, request, pk):
        partial = True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        user = User.objects.filter(id=self.request.user.id)
        user.update(first_name=first_name, last_name=last_name)
        answer = self.request.data.get('info')
        if answer:
            for ans in answer:
                a = Answer.objects.filter(user=self.request.user, question_id=ans['question'])
                if a:
                    a.update(answer_id=ans['answer'])
                else:
                    Answer.objects.create(user=self.request.user, question_id=ans['question'], answer_id=ans['answer'])
        return Response("profile update successfully")


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Question.objects.all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class OptionViewSet(ModelViewSet):
    serializer_class = OptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Option.objects.all()


class AnswerViewSet(ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Answer.objects.filter(user=self.request.user)
        return queryset


class AddToBagViewSet(ModelViewSet):
    serializer_class = AddToBagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = AddToBag.objects.filter(user=self.request.user)
        return queryset


class ServiceDetailViewSet(ModelViewSet):
    queryset = ServiceDetail.objects.all()
    serializer_class = ServiceDetailSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        if self.request.query_params.get('category'):
            instance = ServiceDetail.objects.filter(category=self.request.query_params.get('category'))
            if not instance:
                return Response({'message': 'Service detail against this category_id doesn\'t exist'})
            serializer = self.get_serializer(instance, many=True)
            return Response(serializer.data)
        return Response({'message': 'Kindly provide valid category id'})


class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
