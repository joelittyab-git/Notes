from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

'''
-----------------------------------------------------------------------------------------Login-View-------------------------------------------------------------------------------------------------
**URL["/user/login/"] => returns token for user authentciation
     :request:{"username":---,"password":---}(POST)
     :response:
          {"auth_status":"success", "auth_data":{"auth_token":...}} -> authentication successfull
          {"auth_status":"fail"} -> incorrect credentials
          {"auth_status":"err", info:{...} } -> exception
          
**URL["/user/login/"] => returns authentication status and user credentials
     :request:{}(GET)
     :response:
          {"auth_status":"success",user:{...}} -> authentication successfull
          {"auth_status":"fail"} -> incorrect credentials
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class UserAuthView(APIView):
     permission_classes = [AllowAny]
     
     def post(self, request, **args):
          
          try:
               username = request.data.username
               password = request.data.password
               
          except Exception as e:
               return Response({"auth_status":"err", "data":{str(e)}})
          
          #authenticating user django's authentciation
          user_auth = authenticate(username = username, password =  password)
          
          if(user_auth is  None):
               return Response({"auth_status":"fail"})
          
          #Generating token for user
          user = User.objects.get(username = username)
          user_token = Token.objects.create(user = user)
          
          return Response({"auth_status":"success", "auth_data":{"auth_token":user_token}})
     
     def get(self, request, **args):
          user = request.user
          
          return Response({"user":str(user)})
     
     def delete(self, request, *args):
          pass
          