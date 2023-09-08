from django.contrib import admin
from django.urls import path
from blog_api import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/blogs/addblog",views.Blog.as_view()),
    path("api/blogs/fetchallblogs",views.Blog.as_view()),
    path("api/blogs/deleteblog/<id>/",views.Blog.as_view()),
    path("api/blogs/updateblog/<id>/",views.Blog.as_view()),
    path("api/blogs/<id>/",views.BlogById.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)