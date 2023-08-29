from django.db import models

# Create your models here.

class UserData(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.email
    
class BlogData(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    date = models.DateField()
    
    def __str__(self):
        return self.title