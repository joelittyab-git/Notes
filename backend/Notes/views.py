from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notes
from Core.utils import Request

'''
-----------------------------------------------------------------------------------------Authentication-View-------------------------------------------------------------------------------------------------
**URL["/notes/"] => uploads the note to the database
     :request:{"title":---,"body":---, "reminder":(bool)---, ?:"reminder_info":{}}(POST)
     :response:
          {"upload_status":"success"} -> note to the database successfull
          {"upload_status":"db_integrity_error"} -> database integrity error
          {"upload_status":"err", info:{...} } -> exception
          
**URL["/notes/"] => deletes the notes
     :request:{"pk":(int)---}(DELETE)
     :response:
          {"deletion_status":"success"} -> note has been successfully deleted
          {"deletion_status":"db_integrity_error"} -> database integrity error
          {"deletion_status":"err", info:{...} } -> exception
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class NoteHandlerView(APIView):
     permission_classes=[IsAuthenticated]
     
     def post(self,request,**args):
          # getting the http request information
          user, data = Request.get_request_information(request)
          serialzed = (data)
          
          # getting serialized data
          try:
               note_title = serialzed.get("title")
               note_body = serialzed.get("body")
               note_reminder_status = serialzed.get("reminder")
          except Exception as e:
               return Response({"upload_status":"err", "info":{str(e)}})
          
          # saving new note instance to database
          try:
               Notes.objects.create(author = user, title= note_title, body=note_body, remind_user = note_reminder_status).save()
          except Exception as e:
               #database integrity error
               return Response({"upload_status":"err", "info":{str(e)}})
          
          
          return Response({"upload_status":"success"})
     
     def delete(self, request, *args, **kwargs):
          #getting request information
          user, data = Request.get_request_information(request)
          
          return Response({str(user):str(data)})
          
          
          
          
          
          