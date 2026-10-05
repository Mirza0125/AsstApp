from datetime import datetime, timedelta
from rest_framework import serializers
from django.db import transaction
from home.api.v1.serializers import ServicesSerializer
from home.models import Employee
from service_provider.models import AvailableTimeSlots
from service_provider.api.v1.serializers import AvailableTimeSlotSerializer
from booking.models import BookingRequest, BookingRequestServices, BookingRequestRecurring
from dateutil.relativedelta import relativedelta
from booking.models import ServicesTimeSlots
from lucky_moon_20705.utils import add_notifications


class ServicesTimeSlotsSerializer(serializers.ModelSerializer):
    booking_time_slot = AvailableTimeSlotSerializer()

    class Meta:
        model = ServicesTimeSlots
        fields = ["booking_time_slot"]


class BookingRequestRecurringSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRequestRecurring
        fields = ["booking_weekday"]


class BookingRequestServiceCreateSerializer(serializers.ModelSerializer):
    recurring = BookingRequestRecurringSerializer(many=True, required=False)
    booking_time_slot = serializers.ListField()

    class Meta:
        model = BookingRequestServices
        fields = ["booking_time_slot", "category", "employee", "time_period", "additional_info",
                  "is_recurring", "recurring_duration", "recurring"]
        extra_kwargs = {'recurring_duration': {'required': False}}


class BookingRequestCreateSerializer(serializers.ModelSerializer):
    services = BookingRequestServiceCreateSerializer(many=True)

    class Meta:
        model = BookingRequest
        fields = ["booking_date", "address", "note", "status", "transaction_status", "checkout_confirm", "services"]

    def create(self, validated_data):
        booking_service = validated_data.pop("services")

        # set logged user in booking request
        user = self.context['request'].user
        validated_data.update({"user": user})

        with transaction.atomic():
            # create new booking
            booking = BookingRequest.objects.create(**validated_data)

            for detail in booking_service:

                booking_time_slot = detail.pop("booking_time_slot")

                # set charge amount against service
                # Commented due to change in price scenario
                # detail["charge"] = detail["booking_time_slot"].price

                # set charge amount against service taken from main category model whose price is set by concierge
                detail["charge"] = detail["category"].price

                # Add from_date value to Booking Service payload
                detail["from_date"] = validated_data['booking_date']

                service_recurring = None

                if not detail["is_recurring"]:
                    detail["end_date"] = detail["from_date"]

                if detail["is_recurring"]:

                    service_recurring = detail.pop("recurring")

                    # Add end_date value to Booking Service payload based on time_period (weekly / monthly etc.)
                    if detail['time_period'] == 'one-time':
                        detail["end_date"] = detail["from_date"]
                    elif detail['time_period'] == 'week':
                        if detail['recurring_duration'] == 0:
                            detail["end_date"] = detail["from_date"] + relativedelta(weeks=1)
                        else:
                            detail["end_date"] = detail["from_date"] + relativedelta(weeks=detail['recurring_duration'])
                    elif detail['time_period'] == 'month':
                        if detail['recurring_duration'] == 0:
                            detail["end_date"] = detail["from_date"] + relativedelta(months=1)
                        else:
                            detail["end_date"] = detail["from_date"] + relativedelta(months=detail['recurring_duration'])
                    elif detail['time_period'] == 'year':
                        if detail['recurring_duration'] == 0:
                            detail["end_date"] = detail["from_date"] + relativedelta(years=1)
                        else:
                            detail["end_date"] = detail["from_date"] + relativedelta(years=detail['recurring_duration'])

                # create booking service
                service_detail = BookingRequestServices.objects.create(**detail, booking_request=booking)
                if service_recurring is not None:
                    recurring_detail = [
                        BookingRequestRecurring(
                            booking_service=service_detail,
                            booking_weekday=item["booking_weekday"]
                        ) for item in service_recurring]

                    # create service recurring record in bulk
                    BookingRequestRecurring.objects.bulk_create(recurring_detail)

                if booking_time_slot:
                    services_time_slots = [
                        ServicesTimeSlots(
                            booking_service=service_detail,
                            booking_time_slot_id=item
                        ) for item in booking_time_slot]

                    service_time_slots = ServicesTimeSlots.objects.bulk_create(services_time_slots)

                    hours = timedelta(hours=0)
                    for time_slot in service_time_slots:
                        # calculating required hour
                        time_format = "%H:%M:%S"
                        daily_hour_required = (datetime.strptime(str(
                                                            time_slot.booking_time_slot.end_time), time_format) -
                                                         datetime.strptime(str(
                                                             time_slot.booking_time_slot.start_time), time_format))
                        hours += daily_hour_required

                    service_detail.daily_hour_required = str(hours)
                    service_detail.save()

            message = f"New Booking Created"
            add_notifications(title="New Booking", message=message, sender=user, user_type="concierge")

            return booking


class BookingRequestServiceUpdateSerializer(serializers.ModelSerializer):
    booking_recurring = BookingRequestRecurringSerializer(many=True, required=False)
    booking_time_slot = serializers.ListField(required=False)

    class Meta:
        model = BookingRequestServices
        fields = ["booking_time_slot", "category", "employee", "time_period", "additional_info",
                  "is_recurring", "recurring_duration", "booking_recurring", "daily_hour_required"]
        extra_kwargs = {"daily_hour_required": {"required": False}}

    def update(self, instance, validated_data):
        if "category" in validated_data:
            validated_data["charge"] = validated_data["category"].price

        if "booking_time_slot" in validated_data:
            booking_time_slot = validated_data.pop("booking_time_slot")

            if booking_time_slot:
                services_time_slots = [
                    ServicesTimeSlots(
                        booking_service_id=instance.id,
                        booking_time_slot_id=item
                    ) for item in booking_time_slot]

                ServicesTimeSlots.objects.bulk_create(services_time_slots)

        # update booking service related information

        if "booking_recurring" in validated_data:

            service_recurring = validated_data.pop("booking_recurring")

            # delete recurring details
            if len(service_recurring) > 0:
                BookingRequestRecurring.objects.filter(booking_service_id=instance.id).delete()
                recurring_detail = [
                    BookingRequestRecurring(
                        booking_service_id=instance.id,
                        booking_weekday=item["booking_weekday"]
                    ) for item in service_recurring]

                # create service recurring record in bulk
                BookingRequestRecurring.objects.bulk_create(recurring_detail)

        BookingRequestServices.objects.filter(id=instance.id).update(**validated_data)

        return instance


class BookingRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRequest
        fields = ["booking_date", "address", "note", "status", "transaction_status", "checkout_confirm"]
        extra_kwargs = {"booking_date": {"required": False}}


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['name', 'photo']


class AvailableTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableTimeSlots
        fields = ["start_time", "end_time"]
        ref_name = "booking_available_time"


class BookingRequestServiceSerializer(serializers.ModelSerializer):
    booking_recurring = BookingRequestRecurringSerializer(many=True)
    category = ServicesSerializer()
    employee = EmployeeSerializer()
    booking_time_slots = ServicesTimeSlotsSerializer(many=True, read_only=True, source='time_slots_service')

    class Meta:
        model = BookingRequestServices
        fields = ["id", "booking_time_slots", "category", "employee", "is_recurring", "recurring_duration",
                  "time_period", "booking_recurring", "charge", "additional_info", "daily_hour_required"]
        extra_kwargs = {
            "daily_hour_required": {"required": False, "read_only": True},
            "time_period": {"read_only": True},
            "is_recurring": {"read_only": True},
            "recurring_duration": {"read_only": True}
        }


class BookingRequestSerializer(serializers.ModelSerializer):
    booking_service = BookingRequestServiceSerializer(many=True, read_only=True)

    class Meta:
        model = BookingRequest
        fields = ["id", "booking_date", "user", "address", "note", "status", "transaction_status", "checkout_confirm",
                  "booking_service"]


class BookingRequestPastServiceSerializer(serializers.ModelSerializer):
    category = ServicesSerializer()
    employee = EmployeeSerializer()
    booking_time_slots = ServicesTimeSlotsSerializer(many=True, read_only=True, source='time_slots_service')
    booking_date = serializers.SerializerMethodField(read_only=True, method_name="get_booking_date")

    def get_booking_date(self, object):
        return object.booking_request.booking_date

    class Meta:
        model = BookingRequestServices
        fields = ["id", "booking_time_slot", "category", "employee", "booking_date"]


class BookingServiceDetailSerializer(serializers.ModelSerializer):
    booking_recurring = BookingRequestRecurringSerializer(many=True)
    category = ServicesSerializer()
    employee = EmployeeSerializer()
    booking_time_slot = ServicesTimeSlotsSerializer(many=True, read_only=True, source='time_slots_service')
    booking_request = BookingRequestUpdateSerializer()

    class Meta:
        model = BookingRequestServices
        fields = ["booking_request", "id", "booking_time_slot", "category", "employee", "booking_recurring", "charge", "additional_info",
                  "daily_hour_required"]
        extra_kwargs = {
            "daily_hour_required": {"required": False, "read_only": True},
            "time_period": {"read_only": True},
            "is_recurring": {"read_only": True},
            "recurring_duration": {"read_only": True}
        }


class AllServicesSerializer(serializers.ModelSerializer):
    # service_image = serializers.URLField()
    # service_name = serializers.CharField(max_length=1000)
    booking_date = serializers.DateField()
    booking_address = serializers.CharField(max_length=1000)
    resident_name = serializers.CharField(max_length=1000)
    designer_name = serializers.CharField(max_length=1000)
    category = ServicesSerializer()
    booking_time_slot = ServicesTimeSlotsSerializer(many=True, read_only=True, source='time_slots_service')

    class Meta:
        model = BookingRequestServices
        fields = ["id", "booking_date",
                  "booking_address", "resident_name", "designer_name", "category",
                  "booking_time_slot"]
