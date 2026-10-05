from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from property_plan.api.v1.serializers import PropertySerializer, FloorPlanSerializer
from property_plan.models import Property, FloorPlan

User = get_user_model()


class PropertyViewSet(ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    queryset = Property.objects.all()
    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        properties = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='property_floor_plan', url_name='property_floor_plan')
    def get_property_floor_plan(self, request, pk, **kwargs):

        floor_plans = FloorPlan.objects.filter(property=pk, is_active=True)
        serializer = FloorPlanSerializer(floor_plans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




