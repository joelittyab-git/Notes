from django.db import models
from django.contrib.auth.models import User


'''
------------------------------------------------------------------------------Notes-model-------------------------------------------------------------------------------------------------
[key]:IntegerField -> stores the primary key of the particular note
[user]:ForeignKey -> the foreign key to point to the author of the note
[title]:CharField -> stores the title of the note 
[body]:CharField -> stores the body of the note
[created]:DateTiemField -> sotres the date and time of the note created
[eidted]:DateTiemField -> sotres the date and time of the note edited
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class Notes(models.Model):
     key = models.BigAutoField(primary_key=True)
     author = models.ForeignKey(User,on_delete=models.CASCADE)
     title = models.CharField(max_length=100)
     body = models.CharField(max_length=800)
     remind_user = models.BooleanField(default=False)
     created = models.DateTimeField(auto_now_add=True)
     edited = models.DateTimeField(auto_now=True)
     
     
     def __str__(self)->str:
          return str(self.body)
     
     class Meta:
          ordering = ['created']

'''
------------------------------------------------------------------------------NotesGroup-model[through]-------------------------------------------------------------------------------------------------
[key]:IntegerField -> stores the primary key of the particular note
[notes]:ForeignKey -> many notes whcih are related to one CollabPannel
[title]:CharField -> stores the title of the group name
[members]:CharField -> stores the users which are a part of that particular group
[created]:DateTimeField -> sotres the date and time of the note created
[eidted]:DateTimeField -> sotres the date and time of the note edited
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''
class CollabPannel(models.Model):
     key = models.BigAutoField(primary_key=True)
     title = models.CharField(max_length=100, blank=True, null=True)
     members = models.ManyToManyField(User, through='CollabPannelMembership')
     notes = models.ManyToManyField(Notes)
     created = models.DateTimeField(auto_now_add=True)
     edited = models.DateTimeField(auto_now=True)
     
     class Meta:
          db_table = "NoteGroup"
          
'''
------------------------------------------------------------------------------NotesGroup-Membership-model-------------------------------------------------------------------------------------------------
[user]:ForeignKey -> the user wchich joined the colab pannel
[group]:ForeignKey -> the group to  which the user joined
[membership_type]:CharField -> describes the type of membership the user has in the group
[joined]:DateTimeField -> sotres the date and time of the user joined
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'''         
class CollabPannelMembership(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     group = models.ForeignKey(CollabPannel, models.CASCADE)
     membership_type = models.CharField(max_length=50)
     joined = models.DateTimeField(auto_now_add=True)
     
     def __str__(self) -> str:
          return f"{self.user.username} -- {self.group.title}"
     
     def get_membership_type(self) ->str:
          return self.membership_type