from channels.generic.websocket import AsyncJsonWebsocketConsumer

class BingoConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, code):
        pass

    async def receive_json(self, content):
        # Add your game logic here!
        await self.send_json({"message": "Received!", "data": content})