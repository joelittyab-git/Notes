'''
(static)
     =>Defines the scope of the particular note in the database[Notes]
     ;VARS;
          PUBLIC -> visibility all
          PROTECTED -> visible only to the group
          PRIVATE -> visible only to the user
'''
class NoteScope:
     IS_PUBLIC, PUBLIC = 0,0
     IS_PROTECTED,PROTECTED = 1,1
     IS_PRIVATE,PRIVATE  = 2,2