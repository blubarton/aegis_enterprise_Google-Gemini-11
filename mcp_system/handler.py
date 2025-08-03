import asyncio
from mcp_system.component_registry import ComponentRegistry
from mcp_system.workflow_orchestrator import WorkflowOrchestrator
import uuid
import logging

logger = logging.getLogger(__name__)

class mCPHandler:
    """Multi-Component Processing System Coordinator"""
    
    def __init__(self):
        self.registry = ComponentRegistry()
        self.orchestrator = WorkflowOrchestrator()
        self.active_workflows = {}
        
    def register_component(self, component: object):
        """Register a processing component"""
        try:
            self.registry.add_component(component)
            logger.info(f"Component registered: {component}")
        except Exception as e:
            logger.error(f"Failed to register component: {e}")
        
    async def execute_workflow(self, workflow_name: str, input_data: dict):
        """Execute a predefined workflow"""
        if workflow_name not in self.orchestrator.workflows:
            raise ValueError(f"Workflow {workflow_name} not defined")
            
        workflow = self.orchestrator.workflows[workflow_name]
        task_id = self._generate_task_id()
        self.active_workflows[task_id] = {
            'status': 'running',
            'progress': 0
        }
        
        try:
            result = await self.orchestrator.execute(workflow, input_data)
            self.active_workflows[task_id] = {
                'status': 'completed',
                'result': result
            }
            return result
        except Exception as e:
            self.active_workflows[task_id] = {
                'status': 'failed',
                'error': str(e)
            }
            logger.error(f"Workflow execution failed: {e}")
            raise e
        
    def get_workflow_status(self, task_id: str):
        """Check status of a running workflow"""
        return self.active_workflows.get(task_id, {'status': 'unknown'})
        
    def _generate_task_id(self) -> str:
        """Create unique task identifier"""
        return f"task_{uuid.uuid4().hex[:8]}"
    
    async def shutdown(self):
        """Gracefully shutdown all components"""
        try:
            await self.orchestrator.shutdown()
            self.registry.shutdown()
            logger.info("mCPHandler shutdown completed")
        except Exception as e:
            logger.error(f"Error during shutdown: {e}")
