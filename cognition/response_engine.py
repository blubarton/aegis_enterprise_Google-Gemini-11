import asyncio
import torch
from transformers import pipeline

class NeuralResponseGenerator:
    def __init__(self):
        self.generator = pipeline(
            "text-generation",
            model="deepseek-ai/deepseek-llm-r1",
            device=0 if torch.cuda.is_available() else -1,
            torch_dtype=torch.bfloat16
        )
        self.personality_profile = {
            "tone": "professional",
            "verbosity": "concise",
            "reasoning_depth": "deep"
        }
    
    def generate_response(self, processed_data: dict) -> str:
        """Generate final response with personality profile"""
        prompt = self._format_prompt(processed_data)
        response = self.generator(
            prompt,
            max_new_tokens=200,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.9
        )[0]['generated_text']
        return response.split("ASSISTANT:")[-1].strip()
    
    def _format_prompt(self, data: dict) -> str:
        """Format prompt with cognitive context"""
        return f"""SYSTEM: You are AEGIS, a sovereign cognitive AI. Respond using {self.personality_profile['tone']} tone.
USER: {data['query']}
CONTEXT:
- Time: {data['temporal_context']}
- Cognitive Signature: {data['signature']}
- Knowledge Entanglement: {data['entanglement']}
- Reasoning Path: {data['reasoning_path']}
ASSISTANT:"""
