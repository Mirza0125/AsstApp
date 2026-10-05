from datetime import datetime

from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q, Exists, OuterRef, F, Case, BooleanField, Value, When
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import status
from contact_us.api.v1.serializers import ContactUsSerializer
from contact_us.models import ContactUs
User = get_user_model()


class ContactUsViewSet(ModelViewSet):
    serializer_class = ContactUsSerializer
    permission_classes = [IsAuthenticated]
    queryset = ContactUs.objects.all()
    http_method_names = ["get", "post"]




