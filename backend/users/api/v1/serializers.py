from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from rest_auth.models import TokenModel
from djstripe.models import Customer
from home.models import Employee
from users.models import Pet
from payments.models import UserSubscription
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings
from rest_auth.serializers import LoginSerializer
from django.db.models import F
from home.models import Review
from home.api.v1.serializers import EmployeeReviewSerializer
from lucky_moon_20705.utils import add_notifications
from django_rest_passwordreset.serializers import PasswordTokenSerializer
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    dog = serializers.IntegerField(required=False)
    cat = serializers.IntegerField(required=False)
    other = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = ("id", "name", "username", "email", "password", 'role', 'property_name', 'floor_plan', 'phone_number',
                  'building_number', 'unit_number', 'dog', 'cat', 'other', 'platform', 'term_and_condition')
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
            "role": {
                "required": True,
                "allow_blank": False
            },
            "username": {"required": False}
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
            role=validated_data.get("role"),
            phone_number=validated_data.get('phone_number'),
            term_and_condition=validated_data.get("term_and_condition"),
            property_name=validated_data.get("property_name"),
            floor_plan=validated_data.get("floor_plan"),
            building_number=validated_data.get("building_number"),
            unit_number=validated_data.get("unit_number"),
            location=validated_data.get("location"),
            platform=validated_data.get('platform'),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        Pet.objects.create(user=user, dog=validated_data.get("dog"), cat=validated_data.get("cat"), other=validated_data.get("other"))
        request = self._get_request()
        setup_user_email(request, user, [])
        try:
            customer = Customer.create(subscriber=user)
            user.stripe_customer_id = customer.id
            user.save()
            if user.role == "community_designer":
                employee = Employee.objects.create(name=user.username, user=user)
        except:
            pass
        message = f"{user.name}, Successfully Registered"
        add_notifications(title="New Resident Registered", message=message, sender=user, user_type="concierge")
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "phone_number", "username", "first_name", "last_name", "image", "role"]
        read_only_fields = ("id", "username", "first_name", "last_name", "image", "role")


class UserSerializer(serializers.ModelSerializer):
    em_id = serializers.CharField(source="user_employees.id", read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "name", "phone_number", "username", "first_name", "last_name", "image", "role", "em_id"]


class CustomTokenSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source="user", read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', "user_detail")


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm


class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = '__all__'


class CommunityDesignerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email']

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        # create Community designer user in main User model
        user = User(
            name=validated_data.get("name"),
            email=validated_data.get("email"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
            role="community_designer"
        )

        # Generate random password and send and email containing that random pass
        random_pass = get_random_string()
        user.set_password(random_pass)

        context = {
            'name': user.name,
            'email': user.email,
            'password': random_pass,
            'concierge_name': self.context["request"].user.name
        }

        email_html_message = render_to_string("email/designer_added_template.html", context)
        email = EmailMultiAlternatives(
            subject=f'Welcome to Lucky Moon! Your Account Login Details Inside',
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
            body="",
        )
        email.attach_alternative(email_html_message, "text/html")
        email.send()

        user.save()

        # Create employee profile (Employee model contains all Community Designer profiles)
        Employee.objects.create(name=validated_data.get("name"),
                                email=validated_data.get("email"),
                                user=user)
        message = f"{user.name}, Successfully Added"
        add_notifications(title="New Designer Added", message=message, sender=user, user_type="concierge")
        return user


class DesignerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'phone_number', 'property_name', 'floor_plan',
                  'building_number', 'unit_number', 'photo']
        extra_kwargs = {'id': {'read_only': True}}


class DesignerWithReviewsSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'photo', 'name', 'email', 'phone_number', 'address', 'reviews']

    def get_reviews(self, obj):
        reviews = Review.objects.filter(employee=obj.id)
        return EmployeeReviewSerializer(reviews, many=True).data


class NewLoginSerializer(LoginSerializer):
    CHOICES = (
        ('resident', 'resident'),
        ('community_designer', 'community_designer'),
    )
    role = serializers.ChoiceField(choices=CHOICES, required=True)


class ResidentsListSerializer(serializers.ModelSerializer):
    subscription = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'phone_number', 'subscription', 'image']

    def get_subscription(self, obj):
        subscription = UserSubscription.objects.select_related('user', 'subscription')\
            .filter(user=obj).values(subscription_name=F('subscription__name'))
        return subscription


class NewConciergeLoginSerializer(LoginSerializer):
    email = serializers.EmailField(required=True, allow_blank=False)


class ResetPasswordConfirmSerializer(PasswordTokenSerializer):
    password2 = serializers.CharField()

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError("Passwords does not match")
        return attrs


class SendDesignerEmailAndPassSerializer(serializers.Serializer):
    designer_id = serializers.IntegerField(required=True)


class AllUsersListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "image", "name", "email", 'phone_number']
