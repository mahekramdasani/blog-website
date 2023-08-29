from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
# Create your views here.


class User(APIView):
    def get(self, request):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]
        user_objs = UserData.objects.all()
        serializer = UserSerializer(user_objs, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        data = request.data
        data['password'] = make_password(data['password'])
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = UserData.objects.get(email=data["email"])
            refresh = RefreshToken.for_user(user)
            return Response({"data": serializer.data, "message": "user create successfully",'refresh': str(refresh),
        'access': str(refresh.access_token),}, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request):
        pass

    def delete(self, request,id):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]
        try:
            user_obj = UserData.objects.get(id=id)
            user_obj.delete()
            return Response({"message": "user deleted successfully"}, status=200)

        except:
            return Response({"message": "user not found"}, status=404)
        
class UserLogin(APIView):
    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            try:
                user_obj = UserData.objects.get(email=data["email"])
                if check_password(data["password"], user_obj.password):
                    refresh = RefreshToken.for_user(user_obj)
                    return Response({"message": "login successfully",'refresh': str(refresh),
        'access': str(refresh.access_token),}, status=200)
                else:
                    return Response({"message": "password is incorrect"}, status=400)
            except:
                return Response({"message": "user not found"}, status=404)
        return Response(serializer.errors, status=400)
