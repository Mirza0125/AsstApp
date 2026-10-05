from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.contrib.gis.db.models import PointField
from django_rest_passwordreset.signals import reset_password_token_created
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings

Resident = "resident"
Community_Designer = "community_designer"
Concierge = "concierge"

ROLE_CHOICE = (
    (Resident, 'Resident'),
    (Community_Designer, 'Community Designer'),
    (Concierge, "Concierge"),
)


class User(AbstractUser):
    name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    email = models.EmailField(
        null=True,
        blank=True,
        max_length=255,
    )
    image = models.ImageField(upload_to="user", null=True, blank=True)
    timestamp_created = models.DateTimeField(
        null=True,
        blank=True,
        auto_now_add=True,
    )
    last_updated = models.DateTimeField(
        null=True,
        blank=True,
        auto_now=True,
    )
    role = models.CharField(default=Resident, choices=ROLE_CHOICE, max_length=20)
    phone_number = PhoneNumberField(null=True, blank=True)
    term_and_condition = models.BooleanField(default=False)
    stripe_customer_id = models.CharField(max_length=100, null=True, blank=True)
    property_name = models.CharField(max_length=100, null=True, blank=True)
    floor_plan = models.CharField(max_length=100, null=True, blank=True)
    building_number = models.IntegerField(default=0)
    unit_number = models.IntegerField(default=0)
    location = PointField(null=True, blank=True, srid=4326, verbose_name='Location')
    platform = models.ForeignKey('Marketing', null=True, blank=True, on_delete=models.CASCADE, related_name='user_marketing')

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    @property
    def srid(self):
        return '%s' % None if not self.location else self.location.srid

    @property
    def latitude(self):
        return '%s' % None if not self.location else self.location[0]

    @property
    def longitude(self):
        return '%s' % None if not self.location else self.location[1]


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # send an e-mail to the user
    context = {
        'username': reset_password_token.user.get_full_name,
        'reset_password_token': reset_password_token.key
    }
    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)
    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Lucky-moon app"),
        # message:
        email_plaintext_message,
        # from:
        settings.EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


class Pet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_pets")
    dog = models.IntegerField(default=0)
    cat = models.IntegerField(default=0)
    other = models.IntegerField(default=0)


class Marketing(models.Model):
    platform = models.CharField(max_length=100)

    def __str__(self):
        return self.platform


class ZipCode(models.Model):
    zip_code = models.CharField(max_length=30)
    available = models.BooleanField(default=True)
