from fcm_django.models import FCMDevice


def send_user_custom_notification(user_id, title, message):
    devices = FCMDevice.objects.filter(user_id=user_id)
    if devices:
        devices.send_message(title=title, body=message)