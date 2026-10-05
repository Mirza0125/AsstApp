# from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from users.models import ZipCode
from rest_framework import status, exceptions
from rest_framework import views, filters
from django.contrib.auth import get_user_model
from home.models import Employee
from .serializers import NewLoginSerializer, DesignerWithReviewsSerializer, DesignerProfileSerializer, \
    NewConciergeLoginSerializer, SendDesignerEmailAndPassSerializer, AllUsersListSerializer, ProfileUpdateSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_auth.serializers import LoginSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .serializers import ResetPasswordConfirmSerializer
from django.contrib.auth.password_validation import validate_password, get_password_validators
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.signals import pre_password_reset, post_password_reset
from django.conf import settings
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from django.utils.crypto import get_random_string
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth.hashers import check_password


User = get_user_model()

from users.api.v1.serializers import (
    SignupSerializer,
    UserSerializer, CommunityDesignerSerializer, ResidentsListSerializer
)


# API for signup this API is for signup, get profile, update profile etc.
class SignupViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SignupSerializer

    def get_serializer_class(self):
        if self.request.method == "PATCH" or self.request.method == "PUT":
            return ProfileUpdateSerializer
        return SignupSerializer
    # http_method_names = ["get", "post", "put", "patch"]

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset()).filter(role="concierge")
    #
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     if instance.role == "concierge":
    #         serializer = self.get_serializer(instance)
    #         return Response(serializer.data)
    #     return Response({"detail": "Provided id is not an instance of concierge"})

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     if instance.role == "concierge":
    #         serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_update(serializer)
    #         return Response(serializer.data)
    #     return Response({"detail": "Profile should be of Concierge user type to update"})


# API for concierge user type this API is for adding Community Designer,
# View Community Designers and remove Community Designer
class CommunityDesignerView(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = CommunityDesignerSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']


# API to login as Resident or Community Designer
class LoginViewSet(ViewSet):
    serializer_class = NewLoginSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        if 'role' not in request.data and user.role == 'resident':
            return Response({"token": token.key, "user": user_serializer.data})
        elif user.role == request.data['role']:
            return Response({"token": token.key, "user": user_serializer.data})
        return Response({'error': "You role doesn't match the user type selected"})


class ZipCodeCheckView(views.APIView):
    def get(self, request):
        if "zip_code" in request.query_params:
            zip_code = request.query_params['zip_code']
            if ZipCode.objects.filter(zip_code=zip_code, available=True).exists():
                return Response({"available": "true"}, status=status.HTTP_200_OK)
            return Response({"available": "false"}, status=status.HTTP_200_OK)
        return Response({"detail": "Kindly provide valid zip_code in urls"})


# API for concierge user type This API is for getting designer profile and updating profile only
class DesignerProfileView(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = DesignerProfileSerializer
    http_method_names = ['get', 'put', 'patch', 'delete']
    search_fields = ['name', 'email']
    filter_backends = [filters.SearchFilter]

    @action(methods=['get'], detail=True, url_path='with-reviews', url_name='with-reviews')
    def get_profile_with_reviews(self, request, pk):
        employee = Employee.objects.get(id=pk)
        serializer = DesignerWithReviewsSerializer(employee, context={'request': request})
        return Response(serializer.data)

    def get_queryset(self):
        employee = Employee.objects.all().prefetch_related("user")
        return employee

    # def list(self, request, *args, **kwargs):
    #     employee = Employee.objects.all().prefetch_related('user')
    #     serializer = DesignerProfileSerializer(employee, many=True, context={'request': request})
    #     return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        Employee.objects.get(id=kwargs['pk']).user.delete()
        return Response({'detail': 'Data removed'})


# API for Concierge user type to Log In
class LoginAsConcierge(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""
    serializer_class = NewConciergeLoginSerializer

    def create(self, request):
        try:
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data["user"]
            token, created = Token.objects.get_or_create(user=user)
            user_serializer = UserSerializer(user, context={"request": request})
            if user.role == "concierge":
                return Response({"token": token.key, "user": user_serializer.data})
            return Response({"error": "You should be a Concierge User to login"})
        except Exception as e:
            if "non_field_errors" in e.detail:
                return Response({"non_field_errors": "Email or Password is incorrect"},
                                status=status.HTTP_400_BAD_REQUEST)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


# API for concierge user type to get all residents details and concierge can remove a resident.
class ResidentsListView(ModelViewSet):
    serializer_class = ResidentsListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "email", "phone_number"]

    def get_queryset(self):
        residents = User.objects.filter(role='resident')
        return residents

    def destroy(self, request, *args, **kwargs):
        from django.db.models import ProtectedError
        try:
            User.objects.get(id=kwargs['pk']).delete()
        except ProtectedError as e:
            return Response({"error": "Resident has some services booked"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Data removed'})


class ResetPasswordConfirmViewSet(ModelViewSet):
    serializer_class = ResetPasswordConfirmSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data['password']
        token = serializer.validated_data['token']

        # find token
        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

        # change users password (if we got to this code it means that the user is_active)
        try:
            if reset_password_token.user.eligible_for_reset():
                pre_password_reset.send(sender=self.__class__, user=reset_password_token.user)

                if check_password(password, reset_password_token.user.password):
                    return Response({"password": "The entered password is already the current password"}, status=status.HTTP_400_BAD_REQUEST)

                try:
                    # validate the password against existing validators
                    validate_password(
                        password,
                        user=reset_password_token.user,
                        password_validators=get_password_validators(settings.AUTH_PASSWORD_VALIDATORS)
                    )
                except ValidationError as e:
                    # raise a validation error for the serializer
                    raise exceptions.ValidationError({
                        'password': e.messages
                    })

                reset_password_token.user.set_password(password)
                reset_password_token.user.save()
                post_password_reset.send(sender=self.__class__, user=reset_password_token.user)

                # Delete all password reset tokens for this user
                ResetPasswordToken.objects.filter(user=reset_password_token.user).delete()

                return Response({'status': 'OK'})
        except:

            return Response({"status": "Token is expired or not exist"}, status=status.HTTP_400_BAD_REQUEST)


class SendDesignerEmailAndPassViewSet(GenericAPIView):
    serializer_class = SendDesignerEmailAndPassSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        if len(request.data["designer_id"]) > 0:
            try:
                designer = Employee.objects.get(id=request.data["designer_id"])
                user = User.objects.get(id=designer.user_id)

                # Generate random password and send and email containing that random pass
                random_pass = get_random_string()
                user.set_password(random_pass)

                context = {
                    'name': user.name,
                    'email': user.email,
                    'password': random_pass,
                    'concierge_name': request.user.name
                }

                email_html_message = render_to_string("email/designer_login_details_send.html", context)
                email = EmailMultiAlternatives(
                    subject=f'Your Account Login Information',
                    from_email=settings.EMAIL_HOST_USER,
                    to=[user.email],
                    body="",
                )
                email.attach_alternative(email_html_message, "text/html")
                email.send()

                user.save()

                return Response({"data": "Email sent containing designer email & password"}, status=status.HTTP_200_OK)
            except (Employee.DoesNotExist, User.DoesNotExist) as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Kindly provide a designer ID first"}, status=status.HTTP_400_BAD_REQUEST)


class AllUsersListViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AllUsersListSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']
