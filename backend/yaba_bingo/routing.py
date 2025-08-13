from channels.routing import ProtocolTypeRouter, URLRouter
import bingo.routing

application = ProtocolTypeRouter({
    "websocket": URLRouter(bingo.routing.websocket_urlpatterns),
})