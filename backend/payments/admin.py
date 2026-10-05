from django.contrib import admin
from .models import *


class PaymentRecordAdmin(admin.ModelAdmin):
    list_display = ["id", "amount", "extra_charge", "tip", "customer", "employee_category", "created_at"]


class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'interval')
    list_filter = ['price']
    search_fields = ['name']


class EmployeeSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('employee', 'subscription')
    list_filter = ['employee', ]
    search_fields = ('employee', 'subscription')


class AvailableServiceAdmin(admin.ModelAdmin):
    list_display = ['subscription', 'service_category']


class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'subscription']
    list_filter = ['subscription']
    search_fields = ['user__username']


class ServiceIncludedAdmin(admin.ModelAdmin):
    list_display = ['id', 'subscription', 'service']


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'unit_amount_decimal', 'billing_period']
    exclude = ('id', 'price_id', 'type', 'billing_scheme')

    def save_model(self, request, obj, form, change):
        if obj.product_id:
            stripe.Price.modify(
                obj.price_id,
                active=False
            )
            price = stripe.Price.create(
                unit_amount=int(obj.unit_amount_decimal * 100),
                currency=obj.currency,
                recurring={"interval": obj.billing_period},
                product=obj.product_id,
                active=True,
            )
            stripe.Product.modify(
                obj.product_id,
                name=obj.name,
                default_price=price.id
            )
            obj.price_id = price.id
        else:

            product = stripe.Product.create(name=obj.name, type=obj.type)

            price = stripe.Price.create(
                unit_amount=int(obj.unit_amount_decimal * 100),
                currency=obj.currency,
                recurring={"interval": obj.billing_period},
                product=product.id,
            )
            obj.product_id = product.id
            obj.price_id = price.id
        obj.save()

    def delete_model(self, request, obj):
        stripe.Price.modify(
            obj.price_id,
            active=False
        )
        stripe.Product.delete(obj.product_id)
        obj.delete()


# class AddTipAdmin(admin.ModelAdmin):
#     list_display = ['id', 'user', 'booking_service', 'tip', 'created_at']


# admin.site.register(AddTip, AddTipAdmin)
admin.site.register(Products, ProductAdmin)
admin.site.register(ServiceIncluded, ServiceIncludedAdmin)
admin.site.register(UserSubscription, UserSubscriptionAdmin)
admin.site.register(PaymentRecord, PaymentRecordAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(EmployeeSubscription, EmployeeSubscriptionAdmin)
admin.site.register(SubscriptionBasedService, AvailableServiceAdmin)
