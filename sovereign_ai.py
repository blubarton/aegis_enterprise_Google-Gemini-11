import asyncio
from system.hybrid_manager import HybridIntelligenceCore
from cognition.response_engine import NeuralResponseGenerator
from utils.neural_fingerprint import generate_neural_fingerprint
import hashlib
from datetime import datetime

class SovereignAI:
    VERSION = "1.0.0"
    COGNITIVE_PROFILE = "quantum_enhanced_v3"
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.neural_fp = generate_neural_fingerprint(user_id)
        self.core = HybridIntelligenceCore(user_id, self.neural_fp)
        self.response_engine = NeuralResponseGenerator()
        self.conversation_history = []
        
    async def initialize(self):
        await self.core.initialize()
        
    async def converse(self, query: str) -> str:
        signature = self.core.signature_system.generate_signature(query)
        processed = await self.core.process_query(query)
        response = self.response_engine.generate_response({
            "query": query,
            "signature": signature,
            "temporal_context": datetime.now().isoformat(),
            "entanglement": processed.get("entanglement", 0.75),
            "reasoning_path": processed.get("reasoning_steps", [])
        })
        self.conversation_history.append({"query": query, "response": response})
        return response
    
    def offline_converse(self, query: str) -> str:
        return self.core._offline_reasoning(query)
    
    def export_knowledge(self, path: str):
        self.core.knowledge_vault.export(path)
    
    def import_knowledge(self, path: str):
        self.core.knowledge_vault.import(path)

def create_sovereign_ai(user_id: str) -> SovereignAI:
    return SovereignAI(user_id)
