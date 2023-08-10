from django.contrib import admin
from .models import (
     Notes,
     CollabPannel,
     CollabPannelMembership
)

# admin pannel model config
admin.site.register(Notes)
admin.site.register(CollabPannel)
admin.site.register(CollabPannelMembership)
