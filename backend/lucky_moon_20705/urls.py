"""lucky_moon_20705 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView
from django.conf.urls.static import static
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls import url

urlpatterns = [
    path("", include("home.urls")),
    url(r'^jet/', include('jet.urls', 'jet')),
    path("accounts/", include("allauth.urls")),
    path("api/v1/", include("home.api.v1.urls")),
    path("api/v1/", include("users.api.v1.urls")),
    path("api/v1/", include("push_notification.api.v1.urls")),
    path("api/v1/", include("service_provider.api.v1.urls")),
    path("api/v1/", include("payments.api.v1.urls")),
    path("api/v1/", include("events.api.v1.urls")),
    path("api/v1/", include("booking.api.v1.urls")),
    path("api/v1/", include("contact_us.api.v1.urls")),
    path("api/v1/", include("property_plan.api.v1.urls")),
    path("termcondition", include("terms_and_conditions.urls")),
    path("portal/", admin.site.urls),
    path("users/", include("users.urls", namespace="users")),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("home/", include("home.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Lucky Moon"
admin.site.site_title = "Lucky Moon Admin Portal"
admin.site.index_title = "Lucky Moon Admin"

# swagger
api_info = openapi.Info(
    title="Lucky Moon API",
    default_version="v1",
    description="API documentation for Lucky Moon App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs"),
    path("firebase-messaging-sw.js", TemplateView.as_view(template_name="firebase-messaging-sw.js",
        content_type='application/javascript'))
]

urlpatterns += [path("", TemplateView.as_view(template_name='index.html'))]
urlpatterns += [re_path(r"^(?:.*)/?$",
                TemplateView.as_view(template_name='index.html'))]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]