from django.contrib.auth import get_user_model
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from home.api.v1.serializers import ServicesSerializer
from users.api.v1.serializers import UserSerializer
from service_provider.models import LiveTracking, EmployeeAvailableTime, AvailableTimeSlots
from home.models import Category, Employee, EmployeeCategory, BookingRequest, ServiceTimeSlot
# from home.api.v1.serializers import ServicesSerializer, ServiceTimeSlotSerializer

User = get_user_model()


class UserProfile(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)

    class Meta:
        model = User
        fields = "__all__"


class EmployeeProfileSerializer(serializers.ModelSerializer):
    # id = serializers.CharField(source='pk', read_only=True)
    user_detail = UserSerializer(required=False)
    user_name = serializers.CharField(source="user.name", read_only=False, required=False)
    user_email = serializers.CharField(source="user.email", read_only=True, required=False)
    user_first_name = serializers.CharField(source="user.first_name", read_only=False, required=False)
    user_last_name = serializers.CharField(source="user.last_name", read_only=False, required=False)
    # photo = Base64ImageField()
    years_of_experience = serializers.IntegerField()
    gender = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = Employee
        fields = ["id", "user_name", "user_email", "user_first_name", "user_last_name", "user", "gender",
                  "years_of_experience", "description", "user_detail", 'photo']
        ref_name = "service_provider_emp_profile"

    def update(self, request, validated_data):
        user_data = validated_data.pop('user_detail')
        employee = super(EmployeeProfileSerializer, self).update(request, validated_data)
        if user_data:
            request.user.first_name = user_data.get('first_name')
            request.user.last_name = user_data.get('last_name')
            request.user.save()
            return request
        return request


class EmployeeProfileImageSerializer(serializers.ModelSerializer):
    photo = Base64ImageField()

    class Meta:
        model = Employee
        fields = ["photo"]


class LiveTrackingSerializer(serializers.ModelSerializer):
    # booking1 = BookingRequestSerializer(source="employee.booking_employee", read_only=True, many=True)

    class Meta:
        model = LiveTracking
        fields = "__all__"


class EmployeeCategorySerializer(serializers.ModelSerializer):
    service = ServicesSerializer(source="category", read_only=True)

    class Meta:
        model = EmployeeCategory
        fields = "__all__"


class EmployeeBookingRequestSerializer(serializers.ModelSerializer):
    category_price = serializers.FloatField(source="employee_category.price", read_only=True)
    user_photo = serializers.ImageField(source="user.image", read_only=True)
    # user_name = serializers.CharField(source="employee_category.user", read_only=True)
    user = serializers.CharField()
    employee_category_tittle = serializers.CharField(source="employee_category.category", read_only=True)
    # avg_review = serializers.FloatField(source='employee_category.avg_review', read_only=True)
    avg_review = serializers.FloatField(read_only=True)
    u_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = BookingRequest
        fields = "__all__"


class EmployeeServiceTimeSerializer(serializers.ModelSerializer):
    # employee_time_detail = ServiceTimeSlotSerializer(source="booking_category", read_only=True, many=True)
    # service = ServicesSerializer(source="category", read_only=True)

    class Meta:
        model = ServiceTimeSlot
        fields = "__all__"


class EmployeeAvailableTimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeAvailableTime
        fields = "__all__"


class AvailableTimeSlotSerializer(serializers.ModelSerializer):
    service_price = serializers.DecimalField(max_digits=5, decimal_places=2, read_only=True)
    is_exists = serializers.BooleanField(read_only=True, required=False)

    class Meta:
        model = AvailableTimeSlots
        fields = ["id", "start_time", "end_time", "service_price", "is_exists"]

    def validate(self, attrs):
        if attrs["end_time"] < attrs["start_time"]:
            raise serializers.ValidationError("End time should be greater than start time.")

        return attrs
