from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .viewsets import EventView, CalendarEventView

router = DefaultRouter()
router.register('events', EventView, basename='events')
router.register('calendar_events', CalendarEventView, basename='calendar_events')

urlpatterns = [
    path('', include(router.urls))
]
