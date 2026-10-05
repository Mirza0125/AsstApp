from django.urls import path, include
from rest_framework.routers import DefaultRouter
from property_plan.api.v1.viewsets import PropertyViewSet


router = DefaultRouter()
router.register("property", PropertyViewSet, basename="property")

urlpatterns = [
    path("", include(router.urls)),
]
