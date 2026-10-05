from events.models import Event, EventImage, CalendarEvent
from rest_framework import serializers


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['image']


class EventSerializer(serializers.ModelSerializer):
    event_images = EventImageSerializer(many=True, required=False)
    in_calendar = serializers.BooleanField(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'event_name', 'entry_fee', 'event_date', 'description', 'event_type', 'event_creator', 'location', 'event_images', 'in_calendar']


class CalendarEventSerializer(serializers.ModelSerializer):
    calendar_event = EventSerializer(read_only=True)

    class Meta:
        model = CalendarEvent
        fields = "__all__"
        read_only_fields = ('user', 'show')
