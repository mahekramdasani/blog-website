from django.db import models
from datetime import date
from django.utils import timezone

# today = date.today()

# Create your models here.
class BlogData(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=5000000000)
    tag= models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    date =  models.DateField(auto_now=True)
    image = models.ImageField(upload_to='images/', default='images/default.jpg', blank=True, null=True)
    
    def __str__(self):
        return self.title