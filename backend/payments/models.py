from django.db import models
from django.contrib.auth import get_user_model
from home.models import EmployeeCategory, Category, Employee
from booking.models import BookingRequestServices
from lucky_moon_20705 import settings
import stripe

stripe.api_key = settings.STRIPE_API_KEY

User = get_user_model()


class PaymentRecord(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customer_payment")
    employee_category = models.ForeignKey(EmployeeCategory, on_delete=models.CASCADE, related_name="service_payment")
    amount = models.IntegerField()
    extra_charge = models.IntegerField(default=0, null=True, blank=True)
    tip = models.FloatField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.customer)


class AddTip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tip_user")
    booking_service = models.ForeignKey(BookingRequestServices, on_delete=models.CASCADE,
                                        related_name="tip_booking_service")
    tip = models.FloatField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Subscription(models.Model):
    DAY = "day"
    WEEK = "week"
    MONTH = "month"
    YEAR = "year"
    CHOICES = (
        (DAY, 'Day'),
        (WEEK, 'Week'),
        (MONTH, "Month"),
        (YEAR, "Year")
    )
    name = models.CharField(blank=False, null=False, default="", max_length=50)
    price = models.IntegerField(default=0, null=False)
    stripe_price_id = models.CharField(default="None", max_length=100)
    interval = models.CharField(max_length=20, choices=CHOICES, null=True, blank=True, default=MONTH)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Subscriptions'


# Model to show services for specific Subscription I'd
class ServiceIncluded(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='service_included')
    service = models.CharField(max_length=50)


class EmployeeSubscription(models.Model):
    employee = models.ForeignKey(Employee, related_name="employee_sub", on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, related_name="employee_subscription", on_delete=models.CASCADE)
    stripe_subscription_id = models.CharField(default="None", max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.employee)

    class Meta:
        verbose_name_plural = 'Employee Subscriptions'


class UserSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_subscription')
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='subscription_id')


class SubscriptionBasedService(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='service_subscription')
    service_category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='service_category')


class Products(models.Model):
    # making types choices here
    SERVICE = 'service'
    TYPE_CHOICES = [
        (SERVICE, 'service')
    ]

    # making currency choices here
    USD = 'usd'
    CURRENCY_CHOICES = [
        (USD, 'usd')
    ]

    # making billing scheme choices here
    PER_UNIT = 'per_unit'
    BILLING_SCHEME_CHOICES = [
        (PER_UNIT, 'per_unit')
    ]

    # making billing type choices here
    ONE_TIME = 'one_time'
    RECURRING = 'recurring'
    BILLING_TYPES_CHOICES = [
        (ONE_TIME, 'One Time'),
        (RECURRING, 'Recurring')
    ]

    # making billing type choices here
    DAY, WEEK, MONTH, YEAR = 'day', 'week', 'month', 'year'
    BILLING_PERIOD_CHOICES = [
        (DAY, 'Daily'),
        (WEEK, 'Weekly'),
        (MONTH, 'Monthly'),
        (YEAR, 'Yearly'),
    ]

    # Product fields
    name = models.CharField(max_length=20, null=False, blank=False, default=None)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=SERVICE)
    description = models.TextField(max_length=80, null=True, blank=True, default=None)
    product_id = models.CharField(max_length=50, null=True, blank=True)

    # Price fields
    price_id = models.CharField(max_length=50)
    unit_amount_decimal = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0.0)
    currency = models.CharField(max_length=20, choices=CURRENCY_CHOICES, default=USD)
    billing_scheme = models.CharField(max_length=20, choices=BILLING_SCHEME_CHOICES, default=PER_UNIT)
    billing_type = models.CharField(max_length=20, choices=BILLING_TYPES_CHOICES, default=ONE_TIME)
    billing_period = models.CharField(max_length=20, choices=BILLING_PERIOD_CHOICES, default=MONTH)

    def __str__(self):
        return f'{self.name}'
