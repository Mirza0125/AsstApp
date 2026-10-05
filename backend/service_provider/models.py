from django.db import models
from django.contrib.gis.db import models

# Create your models here.
from users.models import User
from home.models import Category


class LiveTracking(models.Model):
    employee = models.ForeignKey("home.Employee", on_delete=models.CASCADE, related_name="employee_track")
    location = models.PointField()

    def __str__(self):
        return str(self.employee)


class EmployeeAvailableTime(models.Model):
    CHOICES = (
        ("available", "Available"),
        ("booked", "Booked")
    )
    employee = models.ForeignKey("home.Employee", on_delete=models.CASCADE, related_name="available_time")
    service = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name="services")
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    price = models.FloatField(default=3.50, null=False, blank=False)
    status = models.CharField(max_length=20, choices=CHOICES, default="available")

    def __str__(self):
        return str(self.employee)


class AvailableTimeSlots(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    price = models.DecimalField(max_digits=3, decimal_places=2, default=3.50)
    is_active = models.BooleanField(default=True)
