from django.core.validators import MaxValueValidator
from django.db.models import Avg
from django.db import models
from django.contrib.auth import get_user_model
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()


class Category(models.Model):
    name = models.CharField(blank=False, null=False, max_length=255)
    price = models.DecimalField(null=True, max_digits=5, decimal_places=2)
    image = models.ImageField(blank=True, null=True, max_length=1023, upload_to='categories/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


class Service(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()

    def __str__(self):
        return self.name


class Employee(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'))
    name = models.CharField(blank=False, null=False, default="", max_length=255)
    email = models.EmailField(null=True)
    phone_number = PhoneNumberField(null=True, blank=True)
    property_name = models.CharField(max_length=100, null=True)
    floor_plan = models.CharField(max_length=100, null=True)
    building_number = models.IntegerField(null=True)
    unit_number = models.IntegerField(null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_employees")
    photo = models.ImageField(upload_to="employee/photo", null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(blank=True, null=True, max_length=255)
    houseNo = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(blank=True, null=True, max_length=255)
    state = models.CharField(blank=True, null=True, max_length=255)
    zip = models.CharField(blank=True, null=True, max_length=255)
    sub_valid = models.DateField(blank=True, null=True, default="2000-01-01")
    years_of_experience = models.IntegerField(default=0, null=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Employees'
        ordering = ('-created_at',)


class EmployeePhoto(models.Model):
    profile = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="employee_photo")
    profile_image = models.ImageField(upload_to='profile_image')

    def __str__(self):
        return str(self.profile)


class EmployeeCategory(models.Model):
    employee = models.ForeignKey(Employee, related_name="employee_category", on_delete=models.CASCADE, null=True, blank=True)
    service = models.ForeignKey(Category, related_name="category_employee", on_delete=models.CASCADE, null=True)
    # price = models.IntegerField(default=0, null=False)

    def __str__(self):
        return str(f"{self.employee} {self.service}")

    @property
    def avg_review(self):
        avg_review = self.employee_review.aggregate(Avg('rating'))
        return avg_review.get('rating__avg', 0)

    class Meta:
        verbose_name_plural = 'Employee Categories'


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, default=None)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="employee_review", null=True, blank=True)
    comments = models.CharField(max_length=1023, default='', null=False, blank=False)
    rating = models.FloatField(default=0, null=False, validators=[MaxValueValidator(5)])
    # image = models.FileField(upload_to="review", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)


class AddToBag(models.Model):
    TIME_PERIOD = (
        ("one-time", "one-time"),
        ("week", "week"),
        ("month", "month"),
        ("year", "year")
    )
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="add_bag_employee", null=True,
                                 default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="add_bag_user_booking")
    employee_category = models.ForeignKey(EmployeeCategory, related_name="add_bag_category_booking", on_delete=models.CASCADE)
    address = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(blank=True, null=True, max_length=255)
    state = models.CharField(blank=True, null=True, max_length=255)
    zip = models.CharField(blank=True, null=True, max_length=255)
    booking_date = models.DateField(null=False, blank=False)
    booking_time = models.TimeField(null=True, blank=True)
    note = models.CharField(max_length=1023, default='', null=True, blank=True)
    daily_hour_required = models.CharField(max_length=10, null=True, blank=True)
    time_period = models.CharField(max_length=50, choices=TIME_PERIOD, null=True, blank=True)
    created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.user)


class BookingRequest(models.Model):
    CHOICES = (
        ('created', 'Created'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ("pending", "Pending"),
        ('upcoming', "UpComing"),
        ('completed', "Completed")
    )
    STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed')
    )
    TIME_PERIOD = (
        ("one-time", "one-time"),
        ("week", "week"),
        ("month", "month"),
        ("year", "year")
    )
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="booking_employee", null=True, default=None)
    booking_date = models.DateField(null=False, blank=False)
    booking_time = models.TimeField(null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_booking")
    employee_category = models.ManyToManyField(EmployeeCategory, related_name="category_booking")
    # category = models.ForeignKey(Category, related_name="category_booking", on_delete=models.CASCADE)
    address = models.CharField(blank=True, null=True, max_length=255)
    houseNo = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(blank=True, null=True, max_length=255)
    state = models.CharField(blank=True, null=True, max_length=255)
    zip = models.CharField(blank=True, null=True, max_length=255)
    comments = models.CharField(max_length=1023, default='', null=False, blank=False)
    status = models.CharField(max_length=20, choices=CHOICES, default="created")
    transaction_status = models.CharField(max_length=20, choices=STATUS, null=True, blank=True)
    daily_hour_required = models.CharField(max_length=10, null=True, blank=True)
    time_period = models.CharField(max_length=50, choices=TIME_PERIOD, null=True, blank=True)
    checkout_confirm = models.BooleanField(default=False)
    # order_status = models.CharField(choices=ORDER, max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return str(self.user)


class Banner(models.Model):
    image = models.ImageField(upload_to="banner")
    created = models.DateTimeField(auto_now_add=True)


class ServiceTimeSlot(models.Model):
    # employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="employee_time_slot")
    employee_category = models.ForeignKey(EmployeeCategory, on_delete=models.CASCADE, related_name="booking_category")
    time = models.DateTimeField(editable=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.employee_category)


class Message(models.Model):
    send_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="send_message")
    receive_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receive_message")
    message = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.send_to)


class UserMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_message")
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name="message_user")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)


class OnBoard(models.Model):
    image = models.FileField(upload_to="on_board")
    title = models.CharField(max_length=100)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    DROPDOWN = "dropdown"
    TEXT = "text"
    TYPE_STATUS = [
        (DROPDOWN, 'Dropdown'),
        (TEXT, 'Text'),
    ]
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_question')
    question = models.CharField(max_length=300)
    type = models.CharField(choices=TYPE_STATUS, max_length=200, default=DROPDOWN)
    icon = models.FileField(upload_to='category/q_icon', null=True, blank=True)

    def __str__(self):
        return self.question


class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_type')
    option = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.question}--> {self.option}'


class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_answer', null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_answer')
    answer = models.ForeignKey(Option, on_delete=models.CASCADE, related_name='answer_option', null=True, blank=True)
    text = models.CharField(max_length=300, null=True, blank=True)
    created = models.DateField(auto_now_add=True)


class CustomText(models.Model):
    title = models.CharField(
        max_length=150,
    )

    def __str__(self):
        return self.title

    @property
    def api(self):
        return f"/api/v1/customtext/{self.id}/"

    @property
    def field(self):
        return "title"


class HomePage(models.Model):
    body = models.TextField()

    @property
    def api(self):
        return f"/api/v1/homepage/{self.id}/"

    @property
    def field(self):
        return "body"


class ServiceDetail(models.Model):
    category = models.OneToOneField(Category, on_delete=models.CASCADE, related_name='servicedetail_category')
    image = models.ImageField(upload_to="categories/")
    description = models.TextField(max_length=1000)
