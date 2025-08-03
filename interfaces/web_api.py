from fastapi import FastAPI, WebSocket, HTTPException
from sovereign_ai import create_sovereign_ai
import asyncio
import logging

app = FastAPI()
ai_sessions = {}
logger = logging.getLogger("web_api")

@app.websocket("/converse/{user_id}")
async def websocket_conversation(websocket: WebSocket, user_id: str):
    await websocket.accept()
    
    if user_id not in ai_sessions:
        try:
            ai_sessions[user_id] = create_sovereign_ai(user_id)
            await ai_sessions[user_id].initialize()
        except Exception as e:
            logger.error(f"Failed to initialize AI session for {user_id}: {e}")
            await websocket.close(code=1011)
            return
    
    try:
        while True:
            query = await websocket.receive_text()
            response = await ai_sessions[user_id].converse(query)
            await websocket.send_text(response)
    except Exception as e:
        logger.error(f"WebSocket error for user {user_id}: {e}")
        await websocket.close()
