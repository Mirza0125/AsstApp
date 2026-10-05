from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_auth.views import LoginView, PasswordChangeView

from users.api.v1.viewsets import (
    SignupViewSet,
    ZipCodeCheckView,
    CommunityDesignerView,
    DesignerProfileView,
    LoginViewSet,
    LoginAsConcierge,
    ResidentsListView,
    ResetPasswordConfirmViewSet,
    SendDesignerEmailAndPassViewSet,
    AllUsersListViewSet,
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register('add-designer', CommunityDesignerView, basename='add-designer')
router.register('designer-profile', DesignerProfileView, basename='designer-profile')
router.register('login', LoginViewSet, basename='token_obtain_pair')
router.register('login-as-concierge', LoginAsConcierge, basename='login-as-concierge')
router.register('residents-list', ResidentsListView, basename='residents-list')
router.register('reset-password-confirm', ResetPasswordConfirmViewSet, basename='reset-password-confirm')
router.register('all-users-list', AllUsersListViewSet, basename='all-users-list')

urlpatterns = [
    path("", include(router.urls)),
    # path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('designer-login-details/', SendDesignerEmailAndPassViewSet.as_view()),
    path('forgot-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path("zip-code-check/", ZipCodeCheckView.as_view(), name='zip-code-check')
]
