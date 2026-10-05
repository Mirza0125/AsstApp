from django.db import models
from users.models import User

# Create your models here.


class Coupons(models.Model):
    coupon_code = models.CharField(max_length=50, unique=True)
    amount_off = models.PositiveIntegerField(
        help_text='Amount (in the currency specified) that will be taken off the subtotal of any invoices for this '
                  'customer.', blank=True, null=True)
    percent_off = models.PositiveIntegerField(
        blank=True, null=True, help_text='Note : if both values Amount off and Percent off are present '
                                         'in coupon then priority will be given to Amount off.')
    ONCE = 'once'
    FOREVER = 'forever'
    REPEATING = 'repeating'
    DURATION_CHOICES = (
        (ONCE, 'Once'),
        (FOREVER, 'Forever'),
        (REPEATING, 'Repeating'),
    )
    duration = models.CharField(
        max_length=30, choices=DURATION_CHOICES, help_text=
        'Describes how long a customer who applies this coupon will get the discount. '
        'Once: This duration type coupon can be used only once.'
        'Forever: This duration type coupon can be used as many times. "Monthly Redemption Limit" will not have any '
        'effect on this. '
        'You can control how many times it can be used by providing value in "Max Redemptions" and "Redeem by" '
        'Repeating: This duration type coupon is for how many times it can be used per month. It\'s quota can be '
        'defined using Monthly Redemption Limit. e.g. '
        'if Monthly Redemption is 2 then this coupon can be used only 2 times in a month and it\'s quota will reset '
        'after every month. '
        'Max Redemptions limit it by how many months it can be used. e.g. if Max Redemptions value is 2 then this '
        'coupon will be valid for '
        'only 2 months.', default=ONCE)
    duration_in_months = models.PositiveSmallIntegerField(verbose_name='Monthly Redemption Limit',
                                                          help_text='Required only if duration is repeating',
                                                          blank=True, null=True)
    max_redemptions = models.PositiveIntegerField(verbose_name='Max Redemptions (Lifetime)',
                                                  help_text='Maximum number of times this coupon can be redeemed,'
                                                            ' in total, before it is no longer valid (in case of Forever and Repeating duration).',
                                                  blank=True, null=True)
    redeem_by = models.DateTimeField(blank=True, null=True,
                                     help_text='Date after which the coupon can no longer be redeemed')
    is_valid = models.BooleanField(default=True)
    used_count = models.PositiveIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ManyToManyField(User)

    def __str__(self):
        return self.coupon_code