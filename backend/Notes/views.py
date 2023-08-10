from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
'''
-----------------------------------------------------------------------------------------Authentication-View-------------------------------------------------------------------------------------------------
**URL["/notes/"] => uploads the note to the database
     :request:{"title":---,"body":---, reminder:(bool)---, ?:reminder_info:{}}(POST)
     :response:
          {"upload_status":"success"} -> note to the database successfull
          {"upload_status":"db_integrity_error"} -> database integrity error
          {"upload_status":"err", info:{...} } -> exception
          
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class NoteHandlerView(APIView):
     permission_classes=[IsAuthenticated]
     
     def post(self,request,**args):
          
          user = request.user
          
          