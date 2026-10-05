from rest_framework import serializers
from fcm_django.models import FCMDevice

from push_notification.models import Notification, UserNotification, MessagesNotification


class FCMDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FCMDevice
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    is_seen = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(source="sender.image", read_only=True)
    name = serializers.CharField(source="sender.username", read_only=True)
    emp_image = serializers.ImageField(source="sender.user_employees.photo", read_only=True)
    emp_address = serializers.CharField(source="sender.user_employees.address", read_only=True)
    # emp_cate_price = serializers.CharField(read_only=True)
    emp_cate_price = serializers.CharField(source="employee_category.price", read_only=True)
    # emp_category = serializers.CharField(read_only=True)
    emp_category = serializers.CharField(source="employee_category.category.name", read_only=True)
    emp_id = serializers.IntegerField(source="sender.user_employees.id", read_only=True)
    review = serializers.FloatField(read_only=True)
    # booking_id = serializers.CharField(source="sender.user_employees.booking_employee.id",  read_only=True)
    # booking_id = serializers.IntegerField(source="employee_category.category_booking.id", read_only=True)
    booking_id = serializers.IntegerField(read_only=True)
    transaction_status = serializers.CharField(read_only=True)
    tip = serializers.CharField(read_only=True)
    amount = serializers.CharField(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"


    def get_is_seen(self, obj):
        is_seen = False
        try:
            # user_id = obj.send_to
            user_id = self.context.get('request').user
            UserNotification.objects.get(notification_id=obj.id, user_id=user_id)
            is_seen = True
        except UserNotification.DoesNotExist:
            pass
        return is_seen


class UserNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserNotification
        fields = "__all__"


class MessagesNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = MessagesNotification
        fields = ["id", "sender", "receiver", "message"]
        extra_kwargs = {"message": {"required": True}}
