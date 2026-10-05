from django.urls import path, include
from rest_framework.routers import DefaultRouter
from contact_us.api.v1.viewsets import ContactUsViewSet


router = DefaultRouter()
router.register("contactus", ContactUsViewSet, basename="contactus")

urlpatterns = [
    path("", include(router.urls)),
]
