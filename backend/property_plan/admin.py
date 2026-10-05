from django.contrib import admin
from .models import *


class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'city', 'state', 'is_active')
    ordering = ['name']
    search_fields = ['name__istartswith', 'address__istartswith', 'city__istartswith']


class FloorPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'property', 'no_of_floor', 'apartment_from', 'apartment_to', 'is_active')
    ordering = ['id']
    search_fields = ['name__istartswith', 'property__name__istartswith']


admin.site.register(Property, PropertyAdmin)
admin.site.register(FloorPlan, FloorPlanAdmin)
