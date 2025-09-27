from rest_framework import viewsets
from .models import Dog
from .serializers import DogSerializer

class DogViewSet(viewsets.ModelViewSet):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer

from rest_framework import viewsets
from .models import DiscountSection
from .serializers import DiscountSectionSerializer

class DiscountSectionViewSet(viewsets.ModelViewSet):
    queryset = DiscountSection.objects.all()
    serializer_class = DiscountSectionSerializer

from rest_framework import viewsets
from .models import ServiceCard
from .serializers import ServiceCardSerializer

class ServiceCardViewSet(viewsets.ModelViewSet):
    queryset = ServiceCard.objects.all()
    serializer_class = ServiceCardSerializer

from rest_framework import viewsets
from .models import About
from .serializers import AboutSerializer

class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer

from rest_framework import viewsets
from .models import AboutPage
from .serializers import AboutPageSerializer

class AboutPageViewSet(viewsets.ModelViewSet):
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer

from rest_framework import viewsets, filters
from django_filters import rest_framework as django_filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import DogCategory, DogProduct, PromoBanner
from .serializers import DogCategorySerializer, DogProductSerializer, PromoBannerSerializer


class DogCategoryViewSet(viewsets.ModelViewSet):
    queryset = DogCategory.objects.all()
    serializer_class = DogCategorySerializer


class PromoBannerViewSet(viewsets.ModelViewSet):
    queryset = PromoBanner.objects.all()
    serializer_class = PromoBannerSerializer


class DogProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = DogProduct
        fields = ['brand', 'size', 'breed', 'life_stage', 'flavor', 'min_price', 'max_price']


class DogProductViewSet(viewsets.ModelViewSet):
    queryset = DogProduct.objects.all()
    serializer_class = DogProductSerializer
    filter_backends = [django_filters.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = DogProductFilter
    ordering_fields = ["price", "created_at"]

    @action(detail=False, methods=["get"])
    def filters(self, request):
        """Dynamic filter values"""
        return Response({
            "brands": list(DogProduct.objects.exclude(brand__isnull=True).exclude(brand="").values_list("brand", flat=True).distinct()),
            "sizes": list(DogProduct.objects.exclude(size__isnull=True).exclude(size="").values_list("size", flat=True).distinct()),
            "breeds": list(DogProduct.objects.exclude(breed__isnull=True).exclude(breed="").values_list("breed", flat=True).distinct()),
            "life_stages": list(DogProduct.objects.exclude(life_stage__isnull=True).exclude(life_stage="").values_list("life_stage", flat=True).distinct()),
            "flavors": list(DogProduct.objects.exclude(flavor__isnull=True).exclude(flavor="").values_list("flavor", flat=True).distinct()),
            "min_price": DogProduct.objects.all().order_by('price').first().price if DogProduct.objects.exists() else 0,
            "max_price": DogProduct.objects.all().order_by('-price').first().price if DogProduct.objects.exists() else 0
        })





from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Cart, CartItem, DogProduct
from .serializers import UserSerializer, CartSerializer, CartItemSerializer
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
# Register
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        # Render email template
        subject = "Welcome to Pet Supply 🎉"
        from_email = "Pet Supply <your_email@gmail.com>"
        to_email = [user.email]
        html_content = render_to_string("emails/registration_success.html", {"user": user})

        msg = EmailMultiAlternatives(subject, "", from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()


# Login (return JWT)
class LoginView(APIView):
    def post(self, request):
        from django.contrib.auth import authenticate
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data
            })
        return Response({"error": "Invalid Credentials"}, status=400)


# Cart APIs
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DogProduct, Cart, CartItem
from .serializers import DogProductSerializer, CartSerializer, CartItemSerializer
from django.shortcuts import get_object_or_404


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # anyone can register/login




class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return Response(CartSerializer(cart).data)


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)


#product details

from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProductDetail, ProductBanner, Review
from .serializers import ProductSerializer, BannerSerializer, ReviewSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ProductBannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductBanner.objects.all()
    serializer_class = BannerSerializer

class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = ProductDetail.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["brand","size","life_stage","flavor"]
    search_fields = ["name", "description", "brand"]
    ordering_fields = ["price","created_at"]

    @action(detail=True, methods=["post"])
    def add_review(self, request, pk=None):
        product = self.get_object()
        data = request.data.copy()
        data["product"] = product.id
        if request.user.is_authenticated:
            data["user"] = request.user.id
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # update product rating/review_count
            reviews = product.reviews.all()
            product.review_count = reviews.count()
            product.rating = sum(r.rating for r in reviews) / reviews.count() if reviews.count() else 0
            product.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.all().order_by("-created_at")
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


#cat

from rest_framework import viewsets, filters
from django_filters import rest_framework as django_filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CatCategory, CatProduct, CatBanner
from .serializers import CatCategorySerializer, CatProductSerializer, CatBannerSerializer


class CatCategoryViewSet(viewsets.ModelViewSet):
    queryset = CatCategory.objects.all()
    serializer_class = CatCategorySerializer


class CatBannerViewSet(viewsets.ModelViewSet):
    queryset = CatBanner.objects.all()
    serializer_class = CatBannerSerializer


class CatProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = CatProduct
        fields = ['brand', 'size', 'breed', 'life_stage', 'flavor', 'min_price', 'max_price']


class CatProductViewSet(viewsets.ModelViewSet):
    queryset = CatProduct.objects.all()
    serializer_class = CatProductSerializer
    filter_backends = [django_filters.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = CatProductFilter
    ordering_fields = ["price", "created_at"]

    @action(detail=False, methods=["get"])
    def filters(self, request):
        """Dynamic filter values"""
        return Response({
            "brands": list(CatProduct.objects.exclude(brand__isnull=True).exclude(brand="").values_list("brand", flat=True).distinct()),
            "sizes": list(CatProduct.objects.exclude(size__isnull=True).exclude(size="").values_list("size", flat=True).distinct()),
            "breeds": list(CatProduct.objects.exclude(breed__isnull=True).exclude(breed="").values_list("breed", flat=True).distinct()),
            "life_stages": list(CatProduct.objects.exclude(life_stage__isnull=True).exclude(life_stage="").values_list("life_stage", flat=True).distinct()),
            "flavors": list(CatProduct.objects.exclude(flavor__isnull=True).exclude(flavor="").values_list("flavor", flat=True).distinct()),
            "min_price": CatProduct.objects.all().order_by('price').first().price if CatProduct.objects.exists() else 0,
            "max_price": CatProduct.objects.all().order_by('-price').first().price if CatProduct.objects.exists() else 0
        })
    

#smallanimal

from rest_framework import viewsets, filters
from django_filters import rest_framework as django_filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import SmallanimalCategory, SmallanimalProduct, SmallanimalBanner
from .serializers import SmallanimalCategorySerializer, SmallanimalProductSerializer, SmallanimalBannerSerializer


class SmallanimalCategoryViewSet(viewsets.ModelViewSet):
    queryset = SmallanimalCategory.objects.all()
    serializer_class = SmallanimalCategorySerializer


class SmallanimalBannerViewSet(viewsets.ModelViewSet):
    queryset = SmallanimalBanner.objects.all()
    serializer_class = SmallanimalBannerSerializer


class SmallanimalProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = SmallanimalProduct
        fields = ['brand', 'size', 'breed', 'life_stage', 'flavor', 'min_price', 'max_price']


class SmallanimalProductViewSet(viewsets.ModelViewSet):
    queryset = SmallanimalProduct.objects.all()
    serializer_class = SmallanimalProductSerializer
    filter_backends = [django_filters.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = CatProductFilter
    ordering_fields = ["price", "created_at"]

    @action(detail=False, methods=["get"])
    def filters(self, request):
        """Dynamic filter values"""
        return Response({
            "brands": list(SmallanimalProduct.objects.exclude(brand__isnull=True).exclude(brand="").values_list("brand", flat=True).distinct()),
            "sizes": list(SmallanimalProduct.objects.exclude(size__isnull=True).exclude(size="").values_list("size", flat=True).distinct()),
            "breeds": list(SmallanimalProduct.objects.exclude(breed__isnull=True).exclude(breed="").values_list("breed", flat=True).distinct()),
            "life_stages": list(SmallanimalProduct.objects.exclude(life_stage__isnull=True).exclude(life_stage="").values_list("life_stage", flat=True).distinct()),
            "flavors": list(SmallanimalProduct.objects.exclude(flavor__isnull=True).exclude(flavor="").values_list("flavor", flat=True).distinct()),
            "min_price": SmallanimalProduct.objects.all().order_by('price').first().price if SmallanimalProduct.objects.exists() else 0,
            "max_price": SmallanimalProduct.objects.all().order_by('-price').first().price if SmallanimalProduct.objects.exists() else 0
        })
    
#subscribeform

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import Subscriber
from .serializers import SubscriberSerializer

class SubscriberViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            subscriber = serializer.save()

            # 🔹 send email confirmation
            send_mail(
                subject="Thanks for subscribing to PetPalooza 🐾",
                message="Welcome to PetPalooza! You’ll now get updates and offers directly in your inbox.",
                from_email="muthulakshmi5293@gmail.com",
                recipient_list=[subscriber.email],
                fail_silently=False,
            )
            return Response({"message": "Subscribed successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

