from rest_framework import serializers
from payments.models import *


class CardDetailSerializer(serializers.Serializer):
    card_holder_name = serializers.CharField(required=True)
    card_number = serializers.CharField(required=True)
    card_exp_month = serializers.CharField(required=True)
    card_exp_year = serializers.CharField(required=True)
    card_cvv = serializers.CharField(required=True)


class ChargeSerializer(serializers.ModelSerializer):
    # amount = serializers.IntegerField()
    # currency = serializers.CharField()
    # tip = serializers.FloatField(required=False)
    # # service = serializers.IntegerField()
    # # comments = serializers.CharField()
    # # rating = serializers.IntegerField()
    # employee_category = serializers.IntegerField()
    booking_id = serializers.IntegerField()
    # # employee = serializers.IntegerField()
    # # amount_refunded = serializers.IntegerField()

    class Meta:
        model = PaymentRecord
        fields = ["amount", "extra_charge", "tip", "customer", "employee_category", "booking_id"]


class EmployeeSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeSubscription
        fields = ['employee', 'subscription', 'created_at']


class ServiceIncludedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceIncluded
        fields = ['subscription', 'service']


class SubscriptionSerializer(serializers.ModelSerializer):
    service_included = ServiceIncludedSerializer(read_only=True, many=True)

    class Meta:
        model = Subscription
        fields = ['id', 'name', 'price', 'interval', 'service_included', 'stripe_price_id']
        extra_kwargs = {'name': {'required': True}, 'price': {'required': True},
                        'stripe_price_id': {'read_only': True}}


class SubscriptionBasedServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionBasedService
        fields = "__all__"


class AddTipSerializer(serializers.ModelSerializer):
    currency = serializers.CharField(max_length=10, required=True)

    class Meta:
        model = AddTip
        fields = "__all__"
