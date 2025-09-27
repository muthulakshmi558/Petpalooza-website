from django.db import models

class Dog(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='dogs/')
    rating = models.FloatField(default=0)  # 0.0 to 5.0
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name

from django.db import models

class DiscountSection(models.Model):
    heading = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=50, default="Shop Now")
    image = models.ImageField(upload_to="discount/")

    def __str__(self):
        return self.heading

from django.db import models

class ServiceCard(models.Model):
    title = models.CharField(max_length=100)  # e.g., Grooming
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to="services/")

    def __str__(self):
        return self.title

from django.db import models

class About(models.Model):
    title = models.CharField(max_length=200, default="Our Mission")
    description = models.TextField()
    image = models.ImageField(upload_to="about/")

    def __str__(self):
        return self.title

from django.db import models

class AboutPage(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        return self.title


class AboutCard(models.Model):
    aboutpage = models.ForeignKey(AboutPage, related_name="cards", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="aboutpage/cards/")

    def __str__(self):
        return self.title


class AboutSection(models.Model):
    aboutpage = models.OneToOneField(AboutPage, related_name="section", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="aboutpage/section/")

    def __str__(self):
        return self.title

from django.db import models

class DogCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/')

    def __str__(self):
        return self.title


class PromoBanner(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="banners/")

    def __str__(self):
        return self.title


class DogProduct(models.Model):
    name = models.CharField(max_length=200)


    image = models.ImageField(upload_to="products/")
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.CharField(max_length=50)   # "2kg" or "5 counts"
    rating = models.FloatField(default=0)
    review_count = models.IntegerField(default=0)

    category = models.ForeignKey(
        DogCategory, 
        related_name="products", 
        on_delete=models.CASCADE,
        null=True,   # optional for smooth migrations
        blank=True
    )

    # Filters
    brand = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    breed = models.CharField(max_length=100, blank=True, null=True)
    life_stage = models.CharField(max_length=100, blank=True, null=True)
    flavor = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


#cart page
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart - {self.user.email}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart,related_name="items",on_delete=models.CASCADE,null=True, blank=True)    
    product = models.ForeignKey(DogProduct, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


#productdetails
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ProductBanner(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="banners/")
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class ProductDetail(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/")
    # optional extra images (for preview)
    extra_images = models.JSONField(default=list, blank=True)
    rating = models.FloatField(default=0)
    review_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    # add attributes you need for filters
    brand = models.CharField(max_length=100, blank=True)
    size = models.CharField(max_length=50, blank=True)
    life_stage = models.CharField(max_length=50, blank=True)
    flavor = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(ProductDetail, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=255)  # allow anonymous but store name
    email = models.EmailField()
    rating = models.IntegerField()  # 1-5
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review {self.id} - {self.product.name}"

#checkout

class Order(models.Model):
    PAYMENT_CHOICES = [
        ("card", "Netbanking/Credit Card"),
        ("cod", "Cash on Delivery"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    country = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField()
    apartment = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)

    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=50)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

   
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(ProductDetail, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # unit price

  
  #cat

from django.db import models

class CatCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/')

    def __str__(self):
        return self.title


class CatBanner(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="catbanners/")

    def __str__(self):
        return self.title


class CatProduct(models.Model):
    name = models.CharField(max_length=200)


    image = models.ImageField(upload_to="catproducts/")
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.CharField(max_length=50)   # "2kg" or "5 counts"
    rating = models.FloatField(default=0)
    review_count = models.IntegerField(default=0)

    category = models.ForeignKey(
        CatCategory, 
        related_name="catproducts", 
        on_delete=models.CASCADE,
        null=True,   # optional for smooth migrations
        blank=True
    )

    # Filters
    brand = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    breed = models.CharField(max_length=100, blank=True, null=True)
    life_stage = models.CharField(max_length=100, blank=True, null=True)
    flavor = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
#small animals

from django.db import models

class SmallanimalCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/')

    def __str__(self):
        return self.title


class SmallanimalBanner(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="catbanners/")

    def __str__(self):
        return self.title


class SmallanimalProduct(models.Model):
    name = models.CharField(max_length=200)


    image = models.ImageField(upload_to="smallanimalproducts/")
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.CharField(max_length=50)   # "2kg" or "5 counts"
    rating = models.FloatField(default=0)
    review_count = models.IntegerField(default=0)

    category = models.ForeignKey(
        CatCategory, 
        related_name="smallanimalproducts", 
        on_delete=models.CASCADE,
        null=True,   # optional for smooth migrations
        blank=True
    )

    # Filters
    brand = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    breed = models.CharField(max_length=100, blank=True, null=True)
    life_stage = models.CharField(max_length=100, blank=True, null=True)
    flavor = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    #subscribeform

    from django.db import models

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email