import asyncio
import websockets
import json

class SearchWebSocketClient:
    """WebSocket client for real-time search integration"""
    
    def __init__(self):
        self.connection = None
        
    async def connect(self, uri: str):
        self.connection = await websockets.connect(uri)
        
    async def send(self, message: str):
        if not self.connection:
            raise ConnectionError("Not connected to WebSocket server")
        await self.connection.send(message)
        
    async def stream_results(self):
        try:
            while True:
                response = await self.connection.recv()
                data = json.loads(response)
                if data.get('status') == 'complete':
                    break
                if 'result' in data:
                    yield data['result']
        except websockets.exceptions.ConnectionClosed:
            print("WebSocket connection closed unexpectedly")
            
    async def close(self):
        if self.connection:
            await self.connection.close()
            self.connection = None
