from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import UserData

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['email','name','password']
        
    def validate(self,data):
        email = data['email']
        if UserData.objects.filter(email=email).exists():
            raise serializers.ValidationError("User already exists with this email")
        
        if len(data['password']) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        
        if data['name']:
            if len(data['name']) < 3:
                raise serializers.ValidationError("Name must be at least 3 characters long")
            for i in data['name']:
                if i.isdigit():
                    raise serializers.ValidationError("Name must not contain any digit")
        
        return data
        
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = "__all__"