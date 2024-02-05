from django.urls import path
from . import views

urlpatterns = [
    path('', views.registerPage),
    path('messages/', views.index),
    path('login/', views.loginPage)
]