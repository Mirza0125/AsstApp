from django.contrib import admin
from .models import *


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone_number', 'property_name', 'floor_plan', 'user', 'photo')
    list_filter = ['name', 'property_name', 'floor_plan']
    # search_fields = ['user', 'name', 'address', 'houseNo']
    exclude = ['description', 'houseNo', 'city', 'state', 'zip', 'sub_valid', 'years_of_experience', 'is_active']


class EmployeePhotoAdmin(admin.ModelAdmin):
    list_display = ('profile', 'profile_image', )
    list_filter = ['profile', ]
    search_fields = ('profile', )


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image', 'price')
    list_filter = ['name', ]


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee', 'user', 'comments', 'rating')
    list_filter = ['employee', 'user']
    search_fields = ('employee', 'user')


# class BookingRequestAdmin(admin.ModelAdmin):
#     list_display = ('booking_date', 'user',  'address', 'city', 'status', "transaction_status")


class BannerAdmin(admin.ModelAdmin):
    list_display = ['image', "created"]


class ServiceTimeSlotAdmin(admin.ModelAdmin):
    list_display = ['employee_category', 'time', 'created']


class MessageAdmin(admin.ModelAdmin):
    list_display = ["send_to", "receive_by", "message", "created"]


class UserMessageAdmin(admin.ModelAdmin):
    list_display = ["user", "message", "created"]


class OnBoardAdmin(admin.ModelAdmin):
    list_display = ["title", "description", 'image', "created"]


class TypeInlineAdmin(admin.TabularInline):
    model = Option
    # list_display = ["question", "option"]


class OptionAdmin(admin.ModelAdmin):
    list_display = ["id", "question", "option"]


class QuestionAdmin(admin.ModelAdmin):
    list_display = ["id", "category", "question", "type"]
    inlines = [TypeInlineAdmin]


class AnswerAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "question", "answer", 'text', "created"]


class AddToBagAdmin(admin.ModelAdmin):
    list_display = ['user', 'employee_category', 'address', 'booking_date', 'booking_time']


class ServiceDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'category', 'image', 'description']
    list_filter = ['category']


class EmployeeCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'employee', 'service']


admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeePhoto, EmployeePhotoAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(EmployeeCategory, EmployeeCategoryAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(ServiceTimeSlot, ServiceTimeSlotAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(UserMessage, UserMessageAdmin)
admin.site.register(OnBoard, OnBoardAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(AddToBag, AddToBagAdmin)
admin.site.register(ServiceDetail, ServiceDetailAdmin)
