from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from events.models import Event, EventImage, CalendarEvent
from events.api.v1.serializers import EventSerializer, CalendarEventSerializer
from rest_framework.response import Response
from rest_framework import status
from geopy.geocoders import Nominatim
import geopy.distance
from django.db.models import Case, BooleanField, Value, When
from booking.models import *
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
import datetime
from datetime import date, timedelta
from typing import List
from django.db.models import Q, F
import json
from django.conf import settings


class EventView(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        geolocator = Nominatim(user_agent="Lucky Moon")
        event_location = Event.objects.all().prefetch_related('event_creator').values('id', 'location')\
            .filter(event_date__gte=datetime.date.today()).order_by('event_date')
        if 'lat' not in request.query_params or 'lon' not in request.query_params:
            return Response({"detail": "Kindly provide valid coordinates to get Events near you"})
        user_latlon = (float(request.query_params.get('lat')),
                  float(request.query_params.get('lon')))
        event_list = []
        for event in event_location:
            location2 = geolocator.geocode(event['location'], language='en')
            # user_latlon = request.user.location.coords
            event_latlon = (float(location2.latitude), float(location2.longitude))
            distance = geopy.distance.geodesic(user_latlon, event_latlon).miles
            if distance <= 50:
                filter_event = Event.objects.filter(id=event['id'], calendar_events__user=self.request.user)
                if not filter_event:
                    get_event = Event.objects.get(id=event['id'])
                    get_serializer = EventSerializer(get_event)
                    new_dict = dict(get_serializer.data)
                    new_dict['in_calendar'] = False
                    event_list.append(new_dict)
                    continue
                annotate_event = filter_event.annotate(
                    in_calendar=Case(When(calendar_events__user=self.request.user, then=Value(True)),
                                     default=Value(False),
                                     output_field=BooleanField()))
                serializer = EventSerializer(annotate_event.values()[0])
                event_list.append(serializer.data)
        return Response(event_list)

    def create(self, request, *args, **kwargs):
        images = None
        if "images" in request.data:
            images = request.data.pop('images', [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        if images:
            for image in images:
                if not image:
                    return Response({'message': 'Kindly provide at least one image to proceed'})
                EventImage.objects.create(event=serializer.instance, image=image)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        images = None
        if "images" in request.data and len(request.data['images']) > 0:
            images = request.data.pop('images', [])
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if images:
            for image in images:
                if not image:
                    continue
                EventImage.objects.create(event=serializer.instance, image=image)
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)


# function to return weekdays (Monday, Tuesday, etc.) dates between two dates
def find_days_between(start: date, end: date, weekday) -> List[date]:
    total_days: int = (end - start).days + 1
    # weekdays: int = weekday
    all_days = [start + timedelta(days=day) for day in range(total_days)]
    return [day for day in all_days if day.weekday() is weekday]


class CalendarEventView(ModelViewSet):
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=True, url_path='cancel_booking', url_name='cancel_booking')
    def cancel_booking(self, request, pk):
        booking_service = get_object_or_404(BookingRequestServices, id=pk)
        BookingRequest.objects.filter(id=booking_service.booking_request_id)\
            .update(status='cancelled')
        return Response({"detail": "Booking cancelled successfully"})

    def list(self, request, *args, **kwargs):
        user = request.user
        # get date from query_params
        try:
            full_date = request.query_params["booking_date"]
            date_obj = datetime.datetime.strptime(full_date, '%Y-%m-%d').date()
            datetime.datetime(date_obj.year, date_obj.month, date_obj.day)
        except Exception as e:
            return Response({'error': str(e)})

        bookings = None
        serializer = None

        # If user type is concierge or admin then show all data
        if request.user.is_staff or request.user.is_superuser or request.user.role == 'concierge':

            filtered_events = Event.objects.all().filter(event_date=full_date)

            bookings = BookingRequestServices.objects.filter(Q(from_date__gte=full_date) | Q(end_date__gte=full_date))\
                .prefetch_related("time_slots_service__booking_time_slot__start_time")\
                .values("id", "is_recurring", 'from_date', 'end_date', 'category_id',
                        booking_status=F("booking_request__status"),
                        employee_name=F("employee__name"),
                        category_name=F("category__name"),
                        category_image=F("category__image"),
                        booking_date=F("booking_request__booking_date"),
                        booking_time=F("time_slots_service__booking_time_slot__start_time"))\
                .exclude(booking_request__status="cancelled")

            serializer = EventSerializer(filtered_events, many=True)

        # If user type is Resident or Community Designer show only logged user related data
        else:
            # Filter events against date provided and logged-in user to show in calendar
            filtered_events = CalendarEvent.objects.filter(user=request.user, calendar_event__event_date=full_date)

            # filter booking services which is >= from_date or >= end_date
            bookings = BookingRequestServices.objects.filter(
                Q(from_date__gte=full_date) | Q(end_date__gte=full_date),
                Q(employee__user=request.user) | Q(booking_request__user=request.user))\
                .prefetch_related("time_slots_service__booking_time_slot__start_time")\
                .values("id", "is_recurring", 'from_date', 'end_date', 'category_id',
                        booking_status=F("booking_request__status"),
                        employee_name=F("employee__name"),
                        category_name=F("category__name"),
                        category_image=F("category__image"),
                        booking_date=F("booking_request__booking_date"),
                        booking_time=F("time_slots_service__booking_time_slot__start_time"))\
                .exclude(booking_request__status="cancelled")

            serializer = CalendarEventSerializer(filtered_events, many=True, context={"request": request})

        # appended booking services data
        booking_data = []
        for booking in bookings:

            # check to see if booking is_recurring False then check that if booking_date == given date
            if not booking['is_recurring']:
                if booking["booking_date"] == datetime.datetime.strptime(full_date, "%Y-%m-%d").date():
                    booking_data.append(booking)

            # check to see if booking is_recurring True
            # then below method is used to get all weekday (Monday, Tuesday, etc.) dates
            # between two dates from Booking Services and
            # then check whether the user provided date is present in all weekday dates between two dates
            else:
                weekdays = BookingRequestRecurring.objects.filter(booking_service=booking['id'])

                # Iterate weekdays to get booking_weekday value
                for i in weekdays:
                    date_start: date = booking['from_date']
                    date_end: date = booking['end_date']

                    weekday = i.booking_weekday

                    # send params to function (find_days_between)
                    # which will provide a list of weekday (0 = Monday, 1 = Tuesday, etc.) between two dates
                    dates = find_days_between(date_start, date_end, weekday)
                    date_obj = datetime.datetime.strptime(full_date, '%Y-%m-%d').date()
                    if dates:
                        # filter to see if user provided date is present in function provided dates
                        booking_dates = list(filter(lambda d: d == date_obj, dates))

                        # if date is present then append booking recurring data
                        if len(booking_dates) > 0:
                            booking['booking_date'] = date_obj
                            booking['category_image'] = settings.MEDIA_URL + booking['category_image']
                            booking_data.append(BookingServiceObject(
                                booking['id'],
                                booking['booking_status'],
                                booking['employee_name'],
                                booking['category_id'],
                                booking['category_name'],
                                booking['category_image'],
                                booking['booking_date'],
                                booking['booking_time']
                            ))
                            break

        bookings_data = json.dumps([obj.__dict__ for obj in booking_data], default=str)

        # Display all booking and events data separately
        data = {"bookings": json.loads(bookings_data), "events": serializer.data}

        return Response(data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        calendar_event = CalendarEvent.objects.create(calendar_event_id=request.data['calendar_event'], user=request.user)
        serializer = CalendarEventSerializer(calendar_event)
        return Response(serializer.data)


# Class to make booking object with chosen fields used in CalendarEventView
class BookingServiceObject:
    def __init__(self, booking_id, booking_status, employee_name, category_id, category_name, category_image, booking_date, booking_time):
        self.booking_id = booking_id
        self.booking_status = booking_status
        self.employee_name = employee_name
        self.category_id = category_id
        self.category_name = category_name
        self.category_image = category_image
        self.booking_date = booking_date
        self.booking_time = booking_time
