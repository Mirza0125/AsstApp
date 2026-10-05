from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    ServicesViewSet,
    EmployeeProfileViewSet,
    EmployeePhotoViewSet,
    EmployeeReviewViewSet,
    BookingRequestViewSet,
    BannerViewSet,
    EmployeeCategoryViewSet,
    MessageViewSet,
    OnBoardViewSet,
    CustomerUpdateProfileViewSet,
    QuestionViewSet,
    AnswerViewSet,
    AddToBagViewSet,
    ServiceDetailViewSet,
    ServiceViewSet
)

router = DefaultRouter()
router.register("service", ServicesViewSet, basename="service")
router.register("concierge-services", ServiceViewSet, basename="concierge-services")
router.register("employee-profile", EmployeeProfileViewSet, basename="employee_profile")
router.register("employee-photo", EmployeePhotoViewSet, basename="employee_photo")
router.register("employee-review", EmployeeReviewViewSet, basename="employee_review")
# router.register("booking", BookingRequestViewSet, basename="booking")
# router.register("notification", NotificationViewSet, basename="notification")
router.register("banner", BannerViewSet, basename="banner")
router.register("employee-category", EmployeeCategoryViewSet, basename="employee_category")
router.register("message", MessageViewSet, basename="message")
router.register("on-board", OnBoardViewSet, basename="on_board")
router.register("customer-profile", CustomerUpdateProfileViewSet, basename="customer_profile")
router.register("question", QuestionViewSet, basename="question")
router.register("answer", AnswerViewSet, basename="answer")
router.register("add-to-bag", AddToBagViewSet, basename="add_to_bag")
router.register("service-detail", ServiceDetailViewSet, basename="service_detail")

urlpatterns = [
    path("", include(router.urls)),
]
