import asyncio
import json
from websocket_client import SearchWebSocketClient
from search_adapters import GoogleAdapter, BingAdapter, DuckDuckGoAdapter

class SearchOrchestrator:
    """Coordinate search across multiple engines using WebSockets"""
    
    def __init__(self):
        self.adapters = {
            'google': GoogleAdapter(),
            'bing': BingAdapter(),
            'duckduckgo': DuckDuckGoAdapter()
        }
        self.ws_client = SearchWebSocketClient()
        self.result_cache = {}
        
    async def connect(self):
        await self.ws_client.connect("wss://search-proxy.example.com/ws")
        
    async def perform_search(self, query: str, engines: list = None):
        if not engines:
            engines = list(self.adapters.keys())
            
        search_request = {
            'query': query,
            'engines': engines,
            'options': {'max_results': 10}
        }
        
        await self.ws_client.send(json.dumps(search_request))
        
        aggregated = []
        async for result in self.ws_client.stream_results():
            adapter = self.adapters[result['engine']]
            processed = adapter.process(result)
            aggregated.append(processed)
            self.result_cache[query] = self.result_cache.get(query, []) + [processed]
            
        return aggregated
    
    async def cognitive_search(self, query: str, context: dict = None):
        augmented_query = self._augment_query(query, context or {})
        results = await self.perform_search(augmented_query)
        return self._cognitive_filter(results, context or {})
        
    def _augment_query(self, query: str, context: dict) -> str:
        time_context = ""
        if 'temporal_context' in context:
            tc = context['temporal_context']
            time_context = f" current date:{tc.get('date', '')} season:{tc.get('season', '')}"
        return f"{query}{time_context} (filetype:pdf OR filetype:docx)"
    
    def _cognitive_filter(self, results: list, context: dict) -> list:
        return sorted(
            results, 
            key=lambda x: x.get('relevance_score', 0), 
            reverse=True
        )[:5]
    
    async def close(self):
        await self.ws_client.close()
