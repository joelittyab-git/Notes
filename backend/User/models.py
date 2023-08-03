from django.db import models
from django.contrib.auth.models import User


    
'''
-----------------------------------------------------------------------------------------To-Be-Implemented------------------------------------------------------------------------------
'''
class Profile(models.Model):
     user = models.OneToOneField(to=User, on_delete=models.CASCADE)
     country = models.CharField(null=False, blank=False, max_length=100)
 
     