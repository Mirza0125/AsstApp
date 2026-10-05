from django.contrib import admin
from events.models import Event, EventImage, CalendarEvent


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'event_name', 'event_type', 'event_date', 'location']
    search_fields = ["id", "event_name", 'event_date', 'location', 'event_type']
    list_filter = ['event_date', 'location', 'event_type']


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image']
    search_fields = ['id']


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    list_display = ['id', 'calendar_event', 'user']
    list_filter = ['user', 'calendar_event']
