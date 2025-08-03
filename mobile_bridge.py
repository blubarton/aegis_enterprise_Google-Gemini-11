from system.sovereign_ai import create_sovereign_ai
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
import asyncio

class AISession:
    def __init__(self, user_id):
        self.ai = create_sovereign_ai(user_id)
        asyncio.run(self.ai.initialize())
    
    def send_query(self, query):
        return asyncio.run(self.ai.converse(query))

class MobileApp(App):
    def build(self):
        self.session = AISession("mobile_user")
        return ChatInterface(session=self.session)

class ChatInterface(BoxLayout):
    def __init__(self, session, **kwargs):
        super().__init__(**kwargs)
        self.session = session
    
    def on_query(self, query):
        response = self.session.send_query(query)
        self.update_chat(response)
