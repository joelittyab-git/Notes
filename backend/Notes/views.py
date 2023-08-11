from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import NoteSerializer
from .models import Notes

'''
-----------------------------------------------------------------------------------------Authentication-View-------------------------------------------------------------------------------------------------
**URL["/notes/"] => uploads the note to the database
     :request:{"title":---,"body":---, "reminder":(bool)---, ?:"reminder_info":{}}(POST)
     :response:
          {"upload_status":"success"} -> note to the database successfull
          {"upload_status":"db_integrity_error"} -> database integrity error
          {"upload_status":"err", info:{...} } -> exception
          
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class NoteHandlerView(APIView):
     permission_classes=[IsAuthenticated]
     
     def post(self,request,**args):
          # getting the http request information
          user = request.user
          data = request.data
          
          serialzed = NoteSerializer(data)
          
          # getting serialized data
          try:
               note_title = serialzed.data.get("title")
               note_body = serialzed.data.get("body")
               note_reminder_status = serialzed.data.get("reminder")
          except Exception as e:
               return Response({"upload_status":"err", "info":{e}})
          
          # saving new note instance to database
          try:
               Notes.objects.create(author = user, title= note_title, body=note_body, remind_user = note_reminder_status).save()
          except Exception as e:
               #database integrity error
               return Response({"upload_status":"err", "info":{e}})
          
          
          return Response()
          
          
          
          
          
          