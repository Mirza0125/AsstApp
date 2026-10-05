from django.core.validators import MaxValueValidator
from users.models import User
from django.db import models


class ContactUs(models.Model):
    first_name = models.CharField(blank=False, null=False, max_length=255)
    last_name = models.CharField(blank=False, null=False, max_length=255)
    email = models.EmailField(blank=False, null=False)
    phone = models.CharField(blank=False, null=False, max_length=20)
    address = models.CharField(blank=False, null=False, max_length=255)
    message = models.TextField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_contact")