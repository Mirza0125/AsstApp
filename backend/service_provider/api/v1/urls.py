from django.urls import path, include
from rest_framework.routers import DefaultRouter

from service_provider.api.v1.viewsets import (
    EmployeeProfileViewSet,
    LiveTrackingViewSet,
    EmployeeServiceViewSet,
    EmployeeBookingRequestViewSet,
    EmployeeBookingRequestPendingViewSet,
    EmployeeBookingRequestAcceptedViewSet,
    EmployeeServiceTimeViewSet,
    EmployeeAvailableTimeViewSet,
    AvailableTimeSlotViewSet
)

router = DefaultRouter()
router.register("profile", EmployeeProfileViewSet, basename="profile")
router.register("live-tracking", LiveTrackingViewSet, basename="live_tracking")
router.register("employee-service", EmployeeServiceViewSet, basename="employee_service")
router.register("employee-booking", EmployeeBookingRequestViewSet, basename="employee_booking")
router.register("employee-booking-pending", EmployeeBookingRequestPendingViewSet, basename="employee_booking_pending")
router.register("employee-booking-accepted", EmployeeBookingRequestAcceptedViewSet, basename="employee_booking_accepted")
router.register("employee-booking-time", EmployeeServiceTimeViewSet, basename="employee_booking_time")
router.register("employee-available-time", EmployeeAvailableTimeViewSet, basename="employee_available_time")
router.register("available-time-slots", AvailableTimeSlotViewSet, basename="available_time_slots")


urlpatterns = [
    path("", include(router.urls)),
]
