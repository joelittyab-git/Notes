from rest_framework.serializers import ModelSerializer
from .models import Notes

class NoteSerializer(ModelSerializer):     
     class Meta:
          model = Notes
          fields = ['key','title', 'body', 'created', 'edited', 'remind_user']

     