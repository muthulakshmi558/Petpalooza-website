from django.contrib import admin
from .models import Dog,ServiceCard

@admin.register(Dog)
class DogAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'rating', 'image')

from django.contrib import admin
from .models import DiscountSection

@admin.register(DiscountSection)
class DiscountSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "button_text")


@admin.register(ServiceCard)
class ServiceCardAdmin(admin.ModelAdmin):
    list_display = ("title", "description")

from django.contrib import admin
from .models import About

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "short_description", "image_preview")
    search_fields = ("title", "description")
    list_filter = ("title",)
    ordering = ("id",)

    # Custom short description
    def short_description(self, obj):
        return obj.description[:50] + "..." if obj.description else ""
    short_description.short_description = "Description"

    # Image preview in admin list
    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' style='height:50px; width:auto;' />"
        return "No Image"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

from django.contrib import admin
from .models import AboutPage, AboutCard, AboutSection

class AboutCardInline(admin.TabularInline):
    model = AboutCard
    extra = 1

class AboutSectionInline(admin.StackedInline):
    model = AboutSection
    extra = 0

@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    list_display = ("id", "title")
    inlines = [AboutCardInline, AboutSectionInline]

# Optional: register individual models if needed
admin.site.register(AboutCard)
admin.site.register(AboutSection)

from django.contrib import admin
from .models import PromoBanner, DogProduct, DogCategory

# ---------- Promo Banner ----------
@admin.register(PromoBanner)
class PromoBannerAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image_preview")
    search_fields = ("title",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' height='50' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

# ---------- Dog Category ----------
@admin.register(DogCategory)
class DogCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image_preview")
    search_fields = ("title",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' height='50' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

# ---------- Dog Product ----------
@admin.register(DogProduct)
class DogProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "quantity",
        "brand",
        "size",
        "breed",
        "life_stage",
        "flavor",
        "rating",
        "review_count",
        "created_at",
        "image_preview",
    )
    list_filter = (
        "brand",
        "size",
        "breed",
        "life_stage",
        "flavor",
        "category",
    )
    search_fields = ("name", "brand", "breed", "category__title")
    ordering = ("-created_at",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='60' height='60' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"


#cartpage

from django.contrib import admin
from .models import CustomUser, Cart, CartItem

# ------------------- CustomUser -------------------
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username")
    search_fields = ("email", "username")

# ------------------- Cart -------------------
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "created_at")
    search_fields = ("user__email",)

# ------------------- CartItem -------------------
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "product", "quantity")
    search_fields = ("cart__user__email", "product__name")



#product details

from django.contrib import admin
from .models import ProductDetail, ProductBanner, Review

@admin.register(ProductDetail)
class ProductDetailAdmin(admin.ModelAdmin):
    list_display = ("id","name","price","quantity","rating","review_count")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name","brand")

@admin.register(ProductBanner)
class ProductBannerAdmin(admin.ModelAdmin):
    list_display = ("id","title")

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id","product","name","rating","created_at")
    readonly_fields = ("created_at",)


#cat

from django.contrib import admin
from .models import CatBanner, CatProduct, CatCategory

# ---------- Promo Banner ----------
@admin.register(CatBanner)
class CatBannerAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image_preview")
    search_fields = ("title",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' height='50' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

# ---------- Dog Category ----------
@admin.register(CatCategory)
class CatCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image_preview")
    search_fields = ("title",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' height='50' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

# ---------- Dog Product ----------
@admin.register(CatProduct)
class CatProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "quantity",
        "brand",
        "size",
        "breed",
        "life_stage",
        "flavor",
        "rating",
        "review_count",
        "created_at",
        "image_preview",
    )
    list_filter = (
        "brand",
        "size",
        "breed",
        "life_stage",
        "flavor",
        "category",
    )
    search_fields = ("name", "brand", "breed", "category__title")
    ordering = ("-created_at",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='60' height='60' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"


    #smallanimal

    from django.contrib import admin
from .models import SmallanimalBanner, SmallanimalProduct, SmallanimalCategory

# ---------- Promo Banner ----------
@admin.register(SmallanimalBanner)
class SmallanimalBannerAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image_preview")
    search_fields = ("title",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' height='50' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

# ---------- Dog Category ----------
@admin.register(SmallanimalCategory)
class SmallanimalCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image_preview")
    search_fields = ("title",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='80' height='50' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

# ---------- Dog Product ----------
@admin.register(SmallanimalProduct)
class SmallanimalProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "quantity",
        "brand",
        "size",
        "breed",
        "life_stage",
        "flavor",
        "rating",
        "review_count",
        "created_at",
        "image_preview",
    )
    list_filter = (
        "brand",
        "size",
        "breed",
        "life_stage",
        "flavor",
        "category",
    )
    search_fields = ("name", "brand", "breed", "category__title")
    ordering = ("-created_at",)

    def image_preview(self, obj):
        if obj.image:
            return f"<img src='{obj.image.url}' width='60' height='60' style='object-fit:cover;' />"
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

#subscribeform

from django.contrib import admin
from .models import Subscriber

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')  # columns to show
    search_fields = ('email',)                  # add search by email
    ordering = ('-subscribed_at',)    