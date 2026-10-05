from rest_framework import serializers
from contact_us.models import ContactUs

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ["first_name", 'last_name', 'email', 'phone', 'address', 'message']
