from django.contrib import admin
from django.urls import path
from user_api import views

urlpatterns = [
    path("api",views.User.as_view()),
]