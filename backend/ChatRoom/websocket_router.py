from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/room/<str:id>/", consumers.ChatRoomConsumer.as_asgi())
]