from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *

# Create your views here.

class User(APIView):
    def get(self,request):
        pass
    
    def post(self,request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message":"User created successfully"},status=201)
        return Response(serializer.errors,status=400)
    
    def put(self,request):
        pass
    
    def delete(self,request):
        pass
    
    