from django.db import models
from users.models import User
from home.models import Employee, EmployeeCategory, Category
from service_provider.models import AvailableTimeSlots


class BookingRequest(models.Model):
    BOOKING_STATUS = (
        ('created', 'Created'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
        ("pending", "Pending"),
        ('upcoming', "UpComing"),
        ('completed', "Completed")
    )
    STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed')
    )

    booking_date = models.DateField(null=False, blank=False)
    # booking_time = models.TimeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="booking_request_user")
    address = models.CharField(blank=False, null=False, max_length=255)
    note = models.CharField(max_length=1023, default='', null=False, blank=False)
    status = models.CharField(max_length=20, choices=BOOKING_STATUS, default="created")
    transaction_status = models.CharField(max_length=20, choices=STATUS, null=True, blank=True)
    # daily_hour_required = models.CharField(max_length=10, null=True, blank=True)
    # time_period = models.CharField(max_length=50, choices=TIME_PERIOD, null=True, blank=True)
    # store the recurring duration e.g. time_period = month and recurring_duration = 3
    # recurring_duration = models.PositiveSmallIntegerField(null=True, blank=True)
    # is_recurring = models.BooleanField(null=True, default=False)
    checkout_confirm = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return str(self.user)


class BookingRequestServices(models.Model):
    TIME_PERIOD = (
        ("one-time", "one-time"),
        ("week", "week"),
        ("month", "month"),
        ("year", "year")
    )

    booking_request = models.ForeignKey(BookingRequest, on_delete=models.CASCADE, related_name="booking_service")
    # booking_time_slot = models.ForeignKey(AvailableTimeSlots, on_delete=models.PROTECT, related_name="booking_slot")
    # service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name="service")
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.PROTECT, related_name="category")
    from_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    # employee_category = models.ForeignKey(EmployeeCategory, on_delete=models.PROTECT,
    #                                       related_name="booking_emp_category")
    employee = models.ForeignKey(Employee, null=True, on_delete=models.PROTECT, related_name="booking_request_employee")
    daily_hour_required = models.CharField(max_length=10, null=True, blank=True)
    time_period = models.CharField(max_length=20, choices=TIME_PERIOD, null=True, blank=True, default='one-time')
    charge = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    tip_amount = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    additional_info = models.TextField(max_length=1000, null=True, blank=True)
    is_recurring = models.BooleanField(null=True, default=False)
    recurring_duration = models.PositiveSmallIntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f'Category ({self.category}) | Employee ({self.employee}) | ID ({self.id})'


class BookingRequestRecurring(models.Model):
    WEEK_DAYS = (
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday")
    )

    booking_service = models.ForeignKey(BookingRequestServices, on_delete=models.CASCADE,
                                        related_name="booking_recurring")
    booking_weekday = models.PositiveSmallIntegerField(null=False, choices=WEEK_DAYS)


class ServicesTimeSlots(models.Model):
    booking_service = models.ForeignKey(BookingRequestServices, on_delete=models.CASCADE,
                                        related_name='time_slots_service')
    booking_time_slot = models.ForeignKey(AvailableTimeSlots, on_delete=models.CASCADE,
                                               related_name='service_time_slots')
