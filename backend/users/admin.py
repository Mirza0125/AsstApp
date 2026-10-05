from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from users.models import Pet, ZipCode, Marketing


from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "phone_number", "property_name", "floor_plan", "building_number", "unit_number",
                                      "platform", "stripe_customer_id", "image")}),) + auth_admin.UserAdmin.fieldsets
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'role', 'password1', 'password2'),
        }),
    )
    list_display = ["id", "username", 'email', "name", 'role', "is_superuser"]
    search_fields = ["name", "email", "role"]


@admin.register(Pet)
class AddPetAdmin(admin.ModelAdmin):
    list_display = ['user', 'dog', 'cat', 'other']


@admin.register(ZipCode)
class ZipCodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'zip_code', 'available']


@admin.register(Marketing)
class MarketingAdmin(admin.ModelAdmin):
    list_display = ['id', 'platform']
