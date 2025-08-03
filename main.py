import asyncio
from system.sovereign_ai import SovereignAI

async def main():
    ai = SovereignAI("user-12345")
    
    response = await ai.converse("What are the latest advancements in quantum computing?")
    print(f"AI: {response}")
    
    offline_response = ai.offline_converse("Explain quantum entanglement in simple terms")
    print(f"AI (Offline): {offline_response}")

if __name__ == "__main__":
    asyncio.run(main())
