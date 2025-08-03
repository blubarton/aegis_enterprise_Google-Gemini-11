from core.node_manager import NodeManager
from core.quantum_processor import QuantumProcessor
from core.security import SecurityEngine

class NodeOrchestrator:
    def __init__(self):
        self.security_engine = SecurityEngine()
        self.quantum_processor = QuantumProcessor()
        self.node_manager = NodeManager(self.security_engine)
        self.node_manager.loadNodes()
    
    def initialize(self):
        self.security_engine.activateFirewall()
        self.quantum_processor.boot()
        print("Node Orchestrator initialized")
    
    def execute(self, node_type: str, payload: dict):
        task = {
            "nodeType": node_type,
            "payload": payload
        }
        return self.node_manager.execute(task)
    
    def shutdown(self):
        self.node_manager.releaseAll()
        self.quantum_processor.shutdown()
