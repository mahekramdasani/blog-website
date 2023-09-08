from django.contrib import admin
from blog_api.models import BlogData

# Register your models here.
admin.site.register(BlogData)

# class ImageAdmin(admin.ModelAdmin):
#     list_display = ('id', 'image')
