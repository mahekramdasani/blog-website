from django.contrib import admin
from django.urls import path
from blog_api import views

urlpatterns = [
    path("api/blogs/addblog",views.Blog.as_view()),
    path("api/blogs/fetchallblogs",views.Blog.as_view()),
    path("api/blogs/deleteblog/<id>/",views.Blog.as_view()),
    path("api/blogs/updateblog/<id>/",views.Blog.as_view()),
    path("api/blogs/<id>/",views.BlogById.as_view()),
]