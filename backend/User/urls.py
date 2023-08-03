from . import views
from django.urls import path

urlpatterns = [
    path('login/', views.UserAuthView.as_view()),
    
]
