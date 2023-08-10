from django.urls import path
from . import views
'''
NoteHandlerView {URL['/note/]} ==>
    :POST: => make note
    :GET: => return the notes
'''
urlpatterns = [
    path('', views.NoteHandlerView.as_view())
]
