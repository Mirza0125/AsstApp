from django.urls import path, include
from rest_framework.routers import DefaultRouter
from booking.api.v1.viewsets import BookingRequestViewSet, BookingRequestServiceViewSet, \
    CommunityDesignerBookingViewSet, AllServicesViewSet


router = DefaultRouter()
router.register("booking", BookingRequestViewSet, basename="booking")
router.register("booking_service", BookingRequestServiceViewSet, basename="booking_service")
router.register("community_designer_booking", CommunityDesignerBookingViewSet,
                basename="community_designer_booking")
router.register("all_services", AllServicesViewSet, basename="all_services")

urlpatterns = [
    path("", include(router.urls)),
]
