"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter
from channels.routing import URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import OriginValidator
from django.core.wsgi import get_wsgi_application
from ChatRoom.websocket_router  import websocket_urlpatterns
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# mapping for incoming requests for their protocols
application = ProtocolTypeRouter(
     {
          "http":get_wsgi_application(),
          'websocket':(
               AuthMiddlewareStack(
                    URLRouter(
                         websocket_urlpatterns
                    )
               )#,
               # allowed origin for validation
               # [
               #      "http://localhost:3000",
               #      "localhost:3000"
               # ]
          )
     }
)

