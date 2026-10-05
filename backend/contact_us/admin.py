from django.contrib import admin
from .models import *


class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone')
    ordering = ['created']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']


admin.site.register(ContactUs, ContactUsAdmin)