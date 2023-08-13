from django.http.request import HttpRequest

class Request:
     
     '''
     method to get request authentciated user and request body
     params:
          [request:HttpRequest]
     return:
          (user:(contrib.auth.mdoels.User), body:(str))
     '''
     @staticmethod
     def get_request_information(req:HttpRequest):
          # getting the request user information:
          if(req.user.is_authenticated):user = req.user 
          else: user = None

          try:body = req.data
          except Exception as e:body = None
          
          return (user, body)
                