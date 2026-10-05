from django.urls import path, include
from rest_framework.routers import DefaultRouter

from payments.api.v1.viewsets import (
    AddCharge,
    CardDetailView,
    PaymentViewSet,
    SubscriptionViewSet,
    EmployeeSubscriptionViewSet,
    ServiceIncludedView
)
router = DefaultRouter()
router.register('payment', PaymentViewSet, basename='payment')
router.register("subscription", SubscriptionViewSet, basename="subscription")
router.register("service_included", ServiceIncludedView, basename='service_included_in_subscription')
router.register("employee-subscription", EmployeeSubscriptionViewSet, basename="employee_subscription")


urlpatterns = [
    path("", include(router.urls)),

    path('add-charge/', AddCharge.as_view(),),
    path('add-payment-method/', CardDetailView.as_view(),),

]
