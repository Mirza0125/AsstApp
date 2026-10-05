from django.contrib.auth import get_user_model
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from home.models import Category, Employee, EmployeeCategory, EmployeePhoto, Review,\
    BookingRequest, Banner, ServiceTimeSlot, Message, UserMessage, OnBoard,\
    Question, Option, Answer, AddToBag, ServiceDetail, Service

User = get_user_model()


class SpecificFieldUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'image']


class ServicesSerializer(serializers.ModelSerializer):
    is_allowed = serializers.BooleanField(read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", 'image', 'price', 'is_allowed']


class ServiceTimeSlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceTimeSlot
        fields = "__all__"


class EmployeeServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeCategory
        fields = ['id', "employee", "service"]


class EmployeeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeCategory
        fields = "__all__"


class EmployeePhotoSerializer(serializers.ModelSerializer):
    profile_image = Base64ImageField(use_url=True)

    class Meta:
        model = EmployeePhoto
        fields = "__all__"


class EmployeeReviewSerializer(serializers.ModelSerializer):
    user = SpecificFieldUserSerializer()

    class Meta:
        model = Review
        fields = ['id', 'rating', 'comments', 'user', 'created_at']


class EmployeeReviewCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = "__all__"


class EmployeeProfileSerializer(serializers.ModelSerializer):
    from service_provider.api.v1.serializers import EmployeeAvailableTimeSerializer
    employee_category_detail = EmployeeServicesSerializer(source="employee_category", read_only=True, many=True)
    employee_availability = EmployeeAvailableTimeSerializer(source="available_time", read_only=True, many=True)
    client = serializers.IntegerField(read_only=True)
    review = serializers.FloatField(read_only=True)

    class Meta:
        model = Employee
        fields = "__all__"


class BookingRequestSerializer(serializers.ModelSerializer):
    category_price = serializers.FloatField(source="employee_category.price", read_only=True)
    employee_photo = serializers.ImageField(source="employee_category.employee.photo", read_only=True)
    employee_name = serializers.CharField(source="employee_category.employee.name", read_only=True)
    employee_category_tittle = serializers.CharField(source="employee_category.category", read_only=True)
    avg_review = serializers.FloatField(read_only=True)
    emp_id = serializers.IntegerField(source="employee.user.id", read_only=True)
    tip = serializers.CharField(read_only=True)
    amount = serializers.CharField(read_only=True)
    employee_category = EmployeeServicesSerializer(many=True, required=False)

    class Meta:
        model = BookingRequest
        fields = "__all__"


class BannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banner
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    is_seen = serializers.SerializerMethodField(read_only=True)
    sender_image = serializers.ImageField(source="send_to.user_employees.photo", read_only=True)
    receiver_image = serializers.ImageField(source="receive_by.user_employees.photo", read_only=True)

    class Meta:
        model = Message
        fields = "__all__"

    def get_is_seen(self, obj):
        is_seen = False
        try:
            user = self.context.get("request").user
            UserMessage.objects.get(user=user, message=obj.id)
            is_seen = True
        except:
            pass
        return is_seen


class OnBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnBoard
        fields = "__all__"


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(source="question_type", read_only=True, many=True)

    class Meta:
        model = Question
        fields = "__all__"


class AnswerSerializer(serializers.ModelSerializer):
    q_type = serializers.CharField(source='question.question', read_only=True)
    q_icon = serializers.FileField(source='question.icon', read_only=True,)
    ans = serializers.CharField(source='answer.option', read_only=True)

    class Meta:
        model = Answer
        fields = "__all__"


class CustomerUpdateProfileSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    info = AnswerSerializer(source='user_answer', many=True)

    class Meta:
        model = User
        fields = ["id", "name",  'first_name', 'last_name', "email", "image", 'info']


class AddToBagSerializer(serializers.ModelSerializer):
    employee_photo = serializers.ImageField(source="employee_category.employee.photo", read_only=True)
    employee_name = serializers.CharField(source="employee_category.employee.name", read_only=True)
    employee_category_tittle = serializers.CharField(source="employee_category.category", read_only=True)
    category_price = serializers.CharField(source='employee_category.price', read_only=True)
    em_u_id = serializers.CharField(source='employee_category.employee.user.id', read_only=True)

    class Meta:
        model = AddToBag
        fields = '__all__'


class ServiceDetailSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()

    class Meta:
        model = ServiceDetail
        fields = ['id', 'category', 'description', 'image', 'question']

    def get_question(self, obj):
        questions = Question.objects.filter(category=obj.category).values()
        return questions


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"
