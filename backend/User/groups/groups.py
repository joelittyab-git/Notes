
'''
(static)
     =>Defines the membership type of each user in the group to be stored in the database[CollabPannelMembership]
     ;VARS;
          ADMIN -> Group creator 
          MODERATOR -> has all the functions of a moderator but moderator cannot delete the admin from a group
          VIEWER -> can only view and cannot edit.
          MEMBER -> can only create and edit notes but cannot delete them
'''
class MembershipType:
     ADMIN = 'ADMIN'
     MEMBER = 'MEMBER'
     MODERATOR = 'MOD'
     VIEWER = 'VIEWER'