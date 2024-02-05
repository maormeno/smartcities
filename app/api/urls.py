from django.urls import path

from api.views import show_emergencies, refresh_emergency, calculate_complexity_index
from api.views import MyObtainTokenPairView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("emergencies", show_emergencies),
    path("emergencies/<int:id>", refresh_emergency),
    path("emergencies/<int:id>/complexity", calculate_complexity_index),
    path("users/", MyObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("users/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="auth_register"),
]
