from django.db import models


class Property(models.Model):
    name = models.CharField(max_length=100, null=False)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip = models.CharField(max_length=15, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "properties"


class FloorPlan(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, null=False)
    no_of_floor = models.IntegerField(null=False)
    apartment_from = models.CharField(max_length=20, null=False)
    apartment_to = models.CharField(max_length=20, null=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

