from . import views
from django.urls import path

'''
UserAuthView {URL['/user/auth/]} ==>
    :POST: => login
    :GET: => returns authnetication status
    :DELETE: => logouts the user by deleting user authentication token
    
UserRegistrationView {URL['/user/registration/']} ==> 
    :POST: => register
'''
urlpatterns = [
    path('auth/', views.UserAuthView.as_view()),
    path('registration/', views.UserRegistrationView.as_view())
]
