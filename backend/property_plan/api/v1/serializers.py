from rest_framework import serializers
from property_plan.models import Property, FloorPlan


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "name"]
        ordering = ['name']


class FloorPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloorPlan
        fields = ["id", "name", "no_of_floor", "apartment_from", "apartment_to"]
