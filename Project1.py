import asyncio
from mcp import Server, Context

class BasicMCPServer:
    def __init__(self):
        self.server = Server()
        self.context = Context()
    
    async def handle_request(self, request):
        try:
            response = await self.process_context(request)
            return {"status": "success", "data": response}
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    async def process_context(self, request):
        context_data = request.get("context", {})
        self.context.update(context_data)
        return self.context.get_relevant_info()

if __name__ == "__main__":
    server = BasicMCPServer()
    asyncio.run(server.start())
