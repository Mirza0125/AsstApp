from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from home.models import EmployeeCategory
# from users.models import User
User = get_user_model()

Resident = "resident"
Community_Designer = "community_designer"
Concierge = "concierge"

ROLE_CHOICE = (
    (Resident, 'Resident'),
    (Community_Designer, 'Community Designer'),
    (Concierge, "Concierge"),
)


class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender_notification", null=True, blank=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="send_notification", null=True, blank=True)
    # employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="employee_notification")
    title = models.CharField(max_length=200)
    message = models.TextField()
    user_type = models.CharField(default=Concierge, choices=ROLE_CHOICE, max_length=20, null=True, blank=True)
    employee_category = models.ForeignKey(EmployeeCategory, on_delete=models.CASCADE, related_name="emp_category",
                                          null=True, blank=True)
    image = models.FileField(upload_to="notification", null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(f"{self.title} | ID {self.id}")


class UserNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notification")
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name="notification_user")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    # from users.tasks import send_user_custom_notification
    from fcm_django.models import FCMDevice
    if created:
        if instance.receiver:
            devices = FCMDevice.objects.filter(user_id=instance.receiver)
        elif instance.user_type:
            devices = FCMDevice.objects.filter(user__role=instance.user_type)
        else:
            devices = FCMDevice.objects.all()

        if devices:
            devices.send_message(title=instance.title, body=instance.message, data=instance.image)


class MessagesNotification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_sender", null=True, blank=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_receiver", null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
