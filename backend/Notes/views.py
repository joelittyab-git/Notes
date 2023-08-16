from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notes
from Core.utils import Request
from django.db import IntegrityError
from .serializer import NoteSerializer
from .permissions import NoteScope
from django.contrib.auth.models import User
from django.core.serializers import serialize


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
          
**URL["/notes/"] => Edits the notes
     :request:{"body":---, "title":---}(PUT)
     :response:
          {"upload_status":"success"} -> note has been successfully updated
          {"upload_status":"db_integrity_error"} -> database integrity error
          {"upload_status":"err", info:{...} } -> exception   
**URL["/notes/"] => Gets the users notes
     :request:{}(GET)
     :response:
          {"obtain_status":"success", "notes":{...}} -> note has been successfully sent back in the response
          {"obtain_status":"auth_error"} -> user authnetciation failed for notes
          {"obtain_status":"err", info:{...} } -> exception         
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class NoteHandlerView(APIView):
     permission_classes=[IsAuthenticated]
     
     # postng a new note
     def post(self,request,**args):
          # getting the http request information
          user, data = Request.get_request_data(request)
          serialzed = (data)
          
          # getting serialized data
          try:
               note_title = serialzed.get("title")
               note_body = serialzed.get("body")
               if "scope" in serialzed:note_scope = serialzed.get("scope")
               else:note_scope=NoteScope.PRIVATE 
               note_reminder_status = serialzed.get("reminder")
          except Exception as e:
               return Response({"upload_status":"err", "info":{str(e)}})
          
          # saving new note instance to database
          try:
               Notes.objects.create(
                    author = user,
                    title= note_title,
                    body=note_body,
                    remind_user = note_reminder_status,
                    scope = note_scope
               ).save()
          except Exception as e:
               #database integrity error
               return Response({"upload_status":"err", "info":{str(e)}})
          
          
          return Response({"upload_status":"success"})
     
     # deleting a note
     def delete(self, request, *args, **kwargs):
          #getting request information
          user, data = Request.get_request_data(request)
          pk = data.get("pk")
          
          # deletion from database
          try:
               note_post = Notes.objects.get(pk=pk, user=user)
               info = note_post.delete()
               return Response({"deletion_status":"success", "info":str(info)})
          except IntegrityError as e:
               return Response({"deletion_status":"db_integrity_error"})
          except Exception as e:
               return Response({"deletion_status":"err", "info":str(e) })
          

     # editing the notes
     def put(self, request, *args, **kwargs):
          # gets the reuqest data and user related
          user, data = Request.get_request_data(request)
          
          # getting the data
          try:
               body = data.get("body")
               title = data.get("title")
               remind = data.get("remind")
               key = data.get("pk")
          except Exception as e:
               pass
          
          # updating in the database
          try:
               note = Notes.objects.get(user = user,key = key)
               note.body =  body
               note.title = title
               # remind implementation
               note.save()
          except Exception as e:
               return Response({"upload_status":"err", "info":{str(e)}})
          
          return Response({"upload_status":"success"})
     
     # Listing the notes
     def get(self, request,*args, **kwargs):
          
          # getting the request data
          user, data = Request.get_request_data(request)
          
          # determining if the request user is authenticated or note
          if(not request.user.is_authenticated):
               return Response({"obtain_status":"auth_error"})
          
          # obtaining the notes from the database
          try:
               notes = Notes.objects.filter(author = user, scope = NoteScope.IS_PRIVATE)
               serializer = NoteSerializer(notes, many=True)
               return Response({"obtain_status":"success", "notes":serializer.data})
          except Exception as e:
               return Response({"obtain_status":"err", "info":{str(e)}})
          