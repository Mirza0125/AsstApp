from django.urls import path, include

urlpatterns = [
    # path("", include(router.urls)),
    path("stripe/", include("djstripe.urls", namespace="djstripe")),
]