from push_notification.models import Notification


def add_notifications(title, message, sender, user_type, receiver=None):
    notify = Notification()
    notify.sender = sender
    notify.title = title
    notify.message = message
    notify.user_type = user_type
    if receiver:
        notify.receiver = receiver
    notify.save()
