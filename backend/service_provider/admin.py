from django.contrib import admin
from .models import *


class LiveTrackingAdmin(admin.ModelAdmin):
    list_display = ["employee", "location"]


class EmployeeAvailableTimeAdmin(admin.ModelAdmin):
    list_display = ["employee", "date", "start_time", "end_time", "status"]


class AvailableTimeSlotsAdmin(admin.ModelAdmin):
    list_display = ['id', 'start_time', 'end_time', 'is_active']


admin.site.register(AvailableTimeSlots, AvailableTimeSlotsAdmin)
admin.site.register(LiveTracking, LiveTrackingAdmin)
admin.site.register(EmployeeAvailableTime, EmployeeAvailableTimeAdmin)
