from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Event(models.Model):
    event_name = models.CharField(max_length=100)
    entry_fee = models.CharField(max_length=50)
    event_date = models.DateField()
    description = models.TextField(max_length=1000)
    event_type = models.CharField(max_length=50)
    event_creator = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="event_user")
    location = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return self.event_name


class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_images")
    image = models.ImageField(upload_to="events/images", null=True, blank=True)


class CalendarEvent(models.Model):
    calendar_event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="calendar_events")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="calendar_user")
