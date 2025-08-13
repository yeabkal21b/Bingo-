import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import bingo.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yaba_bingo.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(bingo.routing.websocket_urlpatterns),
})