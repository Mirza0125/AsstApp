from django.contrib import admin
from booking.models import *


def custom_titled_filter(title):
    class Wrapper(admin.FieldListFilter):
        def __new__(cls, *args, **kwargs):
            instance = admin.FieldListFilter.create(*args, **kwargs)
            instance.title = title
            return instance
    return Wrapper


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking_date', 'user', 'address', 'note', 'status', 'transaction_status']
    list_filter = ['booking_date', 'user', 'status', 'transaction_status']


@admin.register(BookingRequestServices)
class BookingRequestServicesAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking_request', 'category',
                    'employee', 'charge', 'tip_amount', 'is_recurring',
                    'time_period', 'recurring_duration', 'from_date', 'end_date']
    list_filter = ['id', 'booking_request__booking_date', 'booking_request__user',
                   'employee', 'category', 'is_recurring',
                   ('booking_request__id', custom_titled_filter("Booking Request ID"))]


@admin.register(BookingRequestRecurring)
class BookingRequestRecurringAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking_service', 'booking_weekday']
    list_filter = ['id', 'booking_service__category', 'booking_service__employee',
                   ('booking_service__id', custom_titled_filter('Booking Service ID')), 'booking_weekday']


@admin.register(ServicesTimeSlots)
class ServicesTimeSlotsAdmin(admin.ModelAdmin):
    list_display = ['booking_service', 'booking_time_slot']
