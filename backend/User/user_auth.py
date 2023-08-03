from rest_framework.authentication import TokenAuthentication

class UserAuthenticationSchema(TokenAuthentication):
     keyword = 'Token'