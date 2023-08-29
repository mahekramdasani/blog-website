from django.contrib import admin
from django.urls import path
from user_api import views

urlpatterns = [
    path("api/auth",views.User.as_view()),
    path("deleteuser/<id>/",views.User.as_view()),
    path("api/auth/createuser",views.User.as_view()),
    path("api/auth/login",views.UserLogin.as_view()),
]