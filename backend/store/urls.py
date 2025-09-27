from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (DogViewSet,DiscountSectionViewSet,ServiceCardViewSet,
                    AboutViewSet,AboutPageViewSet,DogCategoryViewSet,
                    DogProductViewSet,PromoBannerViewSet,UserViewSet,CartViewSet,CartItemViewSet,ProductDetailViewSet,ProductBannerViewSet,ReviewViewSet
                    ,OrderViewSet,CatCategoryViewSet,CatProductViewSet,CatBannerViewSet,SmallanimalCategoryViewSet,SmallanimalProductViewSet,SmallanimalBannerViewSet,SubscriberViewSet)

router = DefaultRouter()
router.register(r'dogs', DogViewSet, basename='dog')
router.register(r'discount-section', DiscountSectionViewSet, basename="discount-section")
router.register(r'services', ServiceCardViewSet, basename="services")
router.register(r'about', AboutViewSet)
router.register("aboutpage", AboutPageViewSet, basename="aboutpage")
router.register(r'categories', DogCategoryViewSet)
router.register(r'products', DogProductViewSet, basename='products')
router.register(r'banners', PromoBannerViewSet)
router.register("users", UserViewSet, basename="users")
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-items')
router.register(r"products", ProductDetailViewSet, basename="product")
router.register(r"banners", ProductBannerViewSet, basename="banner")
router.register(r"reviews", ReviewViewSet, basename="review")
router.register(r"orders", OrderViewSet)
router.register(r'catcategories', CatCategoryViewSet)
router.register(r'catproducts', CatProductViewSet, basename='catproducts')
router.register(r'catbanners', CatBannerViewSet)
router.register(r'smallanimalcategories', SmallanimalCategoryViewSet)
router.register(r'smallanimalproducts', SmallanimalProductViewSet, basename='smallanimalproducts')
router.register(r'smallanimalbanners', SmallanimalBannerViewSet)
router.register(r'subscriber', SubscriberViewSet, basename='subscriber')

urlpatterns = [
    path('', include(router.urls)),  # ✅ empty string, no leading slash
]
