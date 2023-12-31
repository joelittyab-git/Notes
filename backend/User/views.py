from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

'''
-----------------------------------------------------------------------------------------Authentication-View-------------------------------------------------------------------------------------------------
**URL["/user/auth/"] => returns token for user authentciation
     :request:{"username":---,"password":---}(POST)
     :response:
          {"auth_status":"success", "auth_data":{"auth_token":...}} -> authentication successfull
          {"auth_status":"fail"} -> incorrect credentials
          {"auth_status":"err", info:{...} } -> exception
          
**URL["/user/auth/"] => returns authentication status and user credentials
     :request:{}(GET)
     :response:
          {"auth_status":"success",user:{...}} -> authentication successfull
          {"auth_status":"fail"} -> incorrect credentials        
          
**URL["/user/auth/] => logs the user out by deleting the respective token
     :request::{}(DELETE)
     :response:
          {"auth_status":"success"} -> token deletion successfull
          {"auth_status":"err", "info":{...} } -> exception

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class UserAuthView(APIView):
     permission_classes = [AllowAny]
     
     def post(self, request, **args):
               
          try:
               username = request.data.get("username")
               password = request.data.get("password")
               
          except Exception as e:
               return Response({"auth_status":"err", "data":{str(e)}})
          
          # Deleting existing tokens if there exists a to the given url
          if(request.user.is_authenticated):
               user = request.user
               status = Token.objects.get(user = user).delete()
          
          #authenticating user django's authentciation
          user_auth = authenticate(username = username, password =  password)
          
          if(user_auth is  None):
               return Response({"auth_status":"fail", "data":"incorrect credetials"})
          
               
          #Generating token for user and storing it in the db
          user = User.objects.get(username = username)
          try:
               user_token = Token.objects.create(user = user)
          except Exception as e:
               try:
                    status = Token.objects.get(user = user).delete()
                    user_token = Token.objects.create(user = user)
               except Exception as e:
                    return Response({"auth_status":"err","data":str(e)})
          
          return Response({"auth_status":"success", "auth_data":{"auth_token":str(user_token)}})
     
     def get(self, request, **args):
          user = request.user
          
          return Response({"user":str(user)})
     
     def delete(self, request, *args):
          try:
               # accesing and deleting the existing token
               user = request.user
               status = Token.objects.get(user = user).delete()
               
               return Response({"auth_status":"success", "action":f"token_deletion+{status}"})
               
          except Exception as e:
               return Response({"auth_status":"err", "info":{str(e)} })
          

'''
-------------------------------------------------------------------------------------User-Registration-View---------------------------------------------------------------------------------------------------
**URL["/user/registration/"] => returns token for user authentciation
     :request:{"username":---,"password":---,"first_name":---,"last_name":---, "email":---}(POST)
     :response:
          {"registration_status":"success"} -> successfull user registration
          {"registration_status":"fail"} -> invalid credentails
          {"registration_status":"err"} -> exception occured during registration 
          
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class UserRegistrationView(APIView):
     permission_classes=[AllowAny]
     
     def post(self, request, *args, **kwargs):
          pass
     
          