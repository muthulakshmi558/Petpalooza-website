from rest_framework import serializers
from .models import Dog

class DogSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ensures absolute URL

    class Meta:
        model = Dog
        fields = "__all__"

from rest_framework import serializers
from .models import DiscountSection

class DiscountSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountSection
        fields = "__all__"

from rest_framework import serializers
from .models import ServiceCard

class ServiceCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCard
        fields = "__all__"

from rest_framework import serializers
from .models import About

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"

from rest_framework import serializers
from .models import AboutPage, AboutCard, AboutSection

class AboutCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutCard
        fields = ["id", "title", "image"]

class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ["id", "title", "description", "image"]

class AboutPageSerializer(serializers.ModelSerializer):
    cards = AboutCardSerializer(many=True, read_only=True)
    section = AboutSectionSerializer(read_only=True)

    class Meta:
        model = AboutPage
        fields = ["id", "title", "content", "cards", "section"]

from rest_framework import serializers
from .models import DogCategory, DogProduct, PromoBanner

class DogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DogCategory
        fields = "__all__"


class PromoBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoBanner
        fields = "__all__"


class DogProductSerializer(serializers.ModelSerializer):
    category = DogCategorySerializer(read_only=True)

    class Meta:
        model = DogProduct
        fields = "__all__"




#cart
from rest_framework import serializers
from .models import CustomUser, Cart, CartItem, DogProduct
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "username", "password"]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


class CartItemSerializer(serializers.ModelSerializer):
    product = DogProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=DogProduct.objects.all(), write_only=True, source="product"
    )

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_id", "quantity"]

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "user", "items"]

#product details

from rest_framework import serializers
from .models import ProductDetail, ProductBanner, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "product", "user", "name", "email", "rating", "comment", "created_at"]
        read_only_fields = ["id", "created_at", "user"]

class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = ProductDetail
        fields = [
            "id","name","slug","description","price","quantity","image",
            "extra_images","rating","review_count","created_at",
            "brand","size","life_stage","flavor","reviews"
        ]

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBanner
        fields = ["id","title","image","description"]

#checkout
from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price"]



class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order
    
from rest_framework import serializers
from .models import CatCategory, CatProduct, CatBanner

class CatCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCategory
        fields = "__all__"


class CatBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatBanner
        fields = "__all__"


class CatProductSerializer(serializers.ModelSerializer):
    category = DogCategorySerializer(read_only=True)

    class Meta:
        model = CatProduct
        fields = "__all__"


#smallanimal

from rest_framework import serializers
from .models import SmallanimalCategory, SmallanimalProduct, SmallanimalBanner

class SmallanimalCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallanimalCategory
        fields = "__all__"


class SmallanimalBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallanimalBanner
        fields = "__all__"


class SmallanimalProductSerializer(serializers.ModelSerializer):
    category = SmallanimalCategorySerializer(read_only=True)

    class Meta:
        model = SmallanimalProduct
        fields = "__all__"

#subscribeform


from rest_framework import serializers
from .models import Subscriber

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'subscribed_at']