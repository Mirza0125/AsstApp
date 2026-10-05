from django.contrib import admin
from coupon.models import Coupons
# Register your models here.


class CouoponAdmin(admin.ModelAdmin):
    list_display = ['coupon_code', 'amount_off', 'percent_off']


admin.site.register(Coupons, CouoponAdmin)