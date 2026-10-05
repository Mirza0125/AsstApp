import datetime
import stripe
from dateutil.relativedelta import relativedelta
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from djstripe.models import Customer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
import json
from stripe.error import StripeError
from lucky_moon_20705 import settings
from payments.api.v1.serializers import CardDetailSerializer, ChargeSerializer, ServiceIncludedSerializer
from payments.models import *
from home.models import EmployeeCategory, Employee
from booking.models import BookingRequest
from users.api.v1.serializers import UserSerializer
from .serializers import SubscriptionSerializer, EmployeeSubscriptionSerializer, AddTipSerializer
from payments.models import Subscription, EmployeeSubscription, AddTip
from django.shortcuts import get_object_or_404

stripe.api_key = settings.STRIPE_API_KEY


class CardDetailView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CardDetailSerializer

    @staticmethod
    def post(request, *args, **kwargs):
        user = request.user
        serializer = CardDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data
        try:
            customer = Customer.objects.filter(subscriber=request.user).first()
            user.stripe_customer_id = customer.id
            user.save()
        except Customer.DoesNotExist:
            customer = Customer.create(subscriber=request.user)
            customer.save()
        try:
            token = stripe.Token.create(
                card={
                    "name": data.get("card_holder_name"),
                    "number": data.get("card_number"),
                    "exp_month": data.get("card_exp_month"),
                    "exp_year": data.get("card_exp_year"),
                    "cvc": data.get("card_cvv")
                }, )

            card = stripe.Customer.create_source(
                request.user.stripe_customer_id,
                source=token.id,
            )

            # payment_method = stripe.PaymentMethod.create(
            #     type="card",
            #     card={"token": token.id},
            # )
            card = customer.add_payment_method(
                payment_method=card.id, set_default=True)
        except stripe.error.CardError as e:
            print(e)
        # try:
        #     old_payment_methods = customer.payment_methods.filter(~Q(id=customer.default_payment_method.id))
        #     old_payment_methods.delete()
        # except PaymentMethod.DoesNotExist:
        #     pass
        return Response("Payment Method Added successfully", status=status.HTTP_201_CREATED)


class AddCharge(APIView):
    serializer_class = ChargeSerializer
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request, *args, **kwargs):
        user = request.user
        stripe_customer = None
        stripe_customer = Customer.objects.filter(subscriber=user).first()
        if not stripe_customer:
            stripe_customer = Customer.create(subscriber=user)
        if stripe_customer:
            if not stripe_customer.default_payment_method:
                return Response({"detail": "Kindly add at-least one payment method"})
            serializer = ChargeSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.data
            booking = get_object_or_404(BookingRequest, id=data.get("booking_id"))
            # Category.objects.filter(id=data.get("service")).first()
            # booking_service = BookingRequestServices.objects.get(id=data.get("booking_service"))
            # employee = Employee.objects.filter(id=data.get("employee")).first()
            try:
                pi = stripe.PaymentIntent.create(
                    amount=((int(data.get("amount")) + int(data.get("extra_charge")) + int(data.get("tip"))) * 100),
                    # amount=int((amount+tip) * 100),
                    currency="usd",
                    payment_method_types=["card"],
                    customer=stripe_customer.id,
                )
                stripe.PaymentIntent.confirm(
                    pi.id,
                    payment_method=stripe_customer.default_payment_method.id,
                )
            except Exception as err:
                return Response(err.user_message)
            # AddTip.objects.create(user=user, booking_service=booking_service,
            #                              tip=data.get("tip"), )
            employee_category = EmployeeCategory.objects.get(id=data['employee_category'])
            PaymentRecord.objects.create(customer=user,
                                         employee_category=employee_category,
                                         amount=data['amount'],
                                         extra_charge=data['extra_charge'],
                                         tip=data['tip'])
            # booking = BookingRequest.objects.get(id=data.get("booking_id"))
            if booking:
                booking.transaction_status = 'completed'
                booking.save()
            # Review.objects.create(employee=employee, user=customer_id, comments=data.get("comments"),
            #                       rating=data.get("rating"), )
            return Response("Paid successfully", status=status.HTTP_201_CREATED)
        return Response({"error": "Kindly get your stripe customer id first"})


class PaymentViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def get_customer_id(self, request):
        if not request.user.stripe_customer_id:
            customer = Customer.create(
                subscriber=request.user,
            )
            request.user.stripe_customer_id = customer.id
            request.user.save()
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def get_subscription(self, customer_id):
        return stripe.Subscription.list(customer=customer_id, limit=1)

    def delete_subscription(self, subs_id):
        return stripe.Subscription.delete(subs_id)

    @action(detail=False, methods=['delete'])
    def delete_card(self, request):
        card = stripe.Customer.delete_source(
            self.request.user.stripe_customer_id,
            request.data.get("card_id"),
        )
        return Response("card delete successfully")

    @action(detail=False, methods=['get'])
    def get_all_cards(self, request):
        customer = Customer.objects.filter(subscriber=request.user).first()
        card = stripe.PaymentMethod.list(
            customer=self.request.user.stripe_customer_id,
            type="card",
        )
        data = {
            "list_card": card.data,
            "default_card_id": customer.default_payment_method.id if customer.default_payment_method else False
        }
        return Response(data)

    @action(detail=False, methods=['get'])
    def get_card(self, request):
        s1 = {}
        customer = Customer.objects.filter(subscriber=self.request.user).first()
        if customer.default_payment_method:
            default_payment_method = customer.default_payment_method
            # res = json.loads(default_payment_method.card)
            s1 = json.dumps(default_payment_method.card)
            d1 = json.loads(s1)
        else:
            default_payment_method = None
            res = "false"
        return Response(d1)

    @action(detail=False, methods=['post'])
    def set_card_default(self, request):
        card_id = self.request.data.get("card_id")
        customer = Customer.objects.get(subscriber=request.user)
        card = customer.add_payment_method(
            payment_method=card_id, set_default=True)
        return Response("successfully set card as default ")


    @action(detail=False, methods=['get'])
    def get_plans(self, request):
        return Response(stripe.Plan.list())

    @action(detail=False, methods=['get'])
    def get_subs(self, request):
        if not request.user.stripe_customer_id:
            customer = stripe.Customer.create(
                description="Customer for {}".format(request.user.email),
                email=request.user.email
            )
            request.user.stripe_customer_id = customer.id
            request.user.save()
        return Response(self.get_subscription(request.user.stripe_customer_id))

    @action(detail=False, methods=['delete'])
    def delete_subs(self, request):
        if not request.user.stripe_customer_id:
            customer = stripe.Customer.create(
                description="Customer for {}".format(request.user.email),
                email=request.user.email
            )
            request.user.stripe_customer_id = customer.id
            request.user.save()
        return Response(self.delete_subscription(request.data["subs_id"]))

    @action(detail=False, methods=['post'])
    def create_product(self, request):
        current_datetime = datetime.datetime.now()
        subscription_start = ''
        employee_detail = BookingRequest.objects.get(id=request.data.get("id"), user=self.request.user)
        price = ''
        product = ''
        hours_price = 0
        iterations = 0
        booking_date = employee_detail.booking_date

        day = relativedelta(booking_date, current_datetime.date()).days
        subscription_start = current_datetime + datetime.timedelta(days=day)
        if employee_detail.time_period == 'one-time':
            total_hours_in_week = int(employee_detail.daily_hour_required)
            employee_cate = employee_detail.employee_category.all()
            employee_cate_price = 0
            for i in employee_cate:
                employee_cate_price += i.price
            hours_price = total_hours_in_week * employee_cate_price
            # hours_price = total_hours_in_week * employee_detail.employee_category.price
            product = stripe.Product.create(name=self.request.user.username)
            price = stripe.Price.create(
                unit_amount=hours_price * 100,
                currency="usd",
                recurring={"interval": "day"},
                product=product.id
            )
            iterations = 1

        elif employee_detail.time_period == 'month' or 'week':
            # next_seven_day = booking_date + timedelta(days=7)
            total_hours_in_week = int(employee_detail.daily_hour_required) * 7
            hours_price = total_hours_in_week * employee_detail.employee_category.price
            product = stripe.Product.create(name=self.request.user.username)
            price = stripe.Price.create(
                unit_amount=hours_price * 100,
                currency="usd",
                recurring={"interval": "week"},
                product=product.id
            )
            iterations = 4 if employee_detail.time_period == 'month' else 1

        if employee_detail.time_period == 'year':
            total_hours_in_mont = int(employee_detail.daily_hour_required) * 30
            hours_price = total_hours_in_mont * employee_detail.employee_category.price
            product = stripe.Product.create(name=self.request.user.username)
            price = stripe.Price.create(
                unit_amount=hours_price * 100,
                currency="usd",
                recurring={"interval": "month"},
                product=product.id
            )
            iterations = 12

        plan = price.id
        if plan:
            cus_sub = self.get_subscription(request.user.stripe_customer_id)
            if cus_sub:
                cus_sub = cus_sub.data[0]
            kwargs = {
                'customer': request.user.stripe_customer_id,
                'items': [
                    {"price": plan},
                ],
                "iterations": iterations,
            }
            if not cus_sub:
                kwargs['trial_period_days'] = 7
            try:
                # subscription = stripe.Subscription.create(**kwargs)
                subscription = stripe.SubscriptionSchedule.create(
                    customer=request.user.stripe_customer_id,
                    start_date=subscription_start,
                    end_behavior="release",
                    phases=[
                        {
                            "items": [
                                {
                                    "price": plan,
                                },
                            ],
                            "iterations": iterations,
                        },
                    ],
                )

            except stripe.error.InvalidRequestError as E:
                return Response(str(E), status=status.HTTP_400_BAD_REQUEST)
            employee_detail.checkout_confirm = True
            employee_detail.save()
            return Response(subscription)

    @action(detail=False, methods=['post'])
    def create_subscription(self, request):
        plan = request.data.get("plan_id")
        if plan:
            cus_sub = self.get_subscription(request.user.stripe_customer_id)
            if cus_sub:
                cus_sub = cus_sub.data[0]
            kwargs = {
                'customer': request.user.stripe_customer_id,
                'items': [
                    {"price": request.data['plan_id']},
                ],
            }

            if not cus_sub:
                kwargs['trial_period_days'] = 7
            try:
                subscription = stripe.Subscription.create(**kwargs)

                if cus_sub:
                    stripe.Subscription.delete(cus_sub.id)

                UserSubscription.objects.create(user=request.user, subscription=Subscription.objects.get(stripe_price_id=plan))

            except stripe.error.InvalidRequestError as E:
                return Response(str(E), status=status.HTTP_400_BAD_REQUEST)

            return Response(subscription)


class EmployeeSubscriptionViewSet(ModelViewSet):
    serializer_class = EmployeeSubscriptionSerializer
    queryset = EmployeeSubscription.objects.all()

    def create(self, request, *args, **kwargs):
        user = request.user
        subscription = Subscription.objects.get(id=request.data['subscription'])
        already_subscription = EmployeeSubscription.objects.filter(
            subscription=request.data.get("subscription"), employee__user=self.request.user
        )
        stripe_subscription = stripe.Subscription.create(
            customer=user.stripe_customer_id,
            items=[
                {"price": subscription.stripe_price_id}
            ],
        )
        if already_subscription:
            already_subscription.delete()
            return Response({"status": 0}, status=status.HTTP_200_OK)
        employee = Employee.objects.get(id=request.data['employee'])
        EmployeeSubscription.objects.create(
            employee=employee,
            subscription=subscription,
            stripe_subscription_id=stripe_subscription['id']
        )
        return Response({"status": 1}, status=status.HTTP_201_CREATED)


class SubscriptionViewSet(ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all().prefetch_related('service_included')

    def create(self, request, *args, **kwargs):
        data = request.data
        if data['name']:
            if Subscription.objects.filter(name=data['name']).exists():
                return Response({'message': 'Subscription name already exists'})
        stripe_product = stripe.Product.create(name=data['name'])
        stripe_price = stripe.Price.create(
            unit_amount=int(data['price']) * 100,
            currency="usd",
            recurring={"interval": data['interval']},
            product=stripe_product['id'],
        )
        subscription = Subscription.objects.create(
            name=data['name'],
            price=data['price'],
            stripe_price_id=stripe_price['id'],
            interval=data['interval']
        )
        serializer = SubscriptionSerializer(subscription)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ServiceIncludedView(ModelViewSet):
    queryset = ServiceIncluded.objects.all()
    serializer_class = ServiceIncludedSerializer
