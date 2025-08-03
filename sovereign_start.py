import asyncio
from sovereign_ai import SovereignAI

async def main():
    ai = SovereignAI("desktop_user")
    await ai.initialize()
    
    print("Sovereign AI Initialized (Ctrl+C to exit)")
    while True:
        query = input("\nYou: ")
        response = await ai.converse(query)
        print(f"\nAI: {response}")

if __name__ == "__main__":
    asyncio.run(main())
