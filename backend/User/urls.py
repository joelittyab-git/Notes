from . import views
from django.urls import path

urlpatterns = [
    path('auth/', views.UserAuthView.as_view()),
    
]
