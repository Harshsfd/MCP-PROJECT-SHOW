import asyncio
class MCPLoadBalancer:
    def __init__(self, servers):
        self.servers = servers
        self.index = 0

    async def route_request(self, request):
        server = self.servers[self.index]
        self.index = (self.index + 1) % len(self.servers)
        response = await server.handle_request(request)
        return response

# Example usage
class DummyServer:
    async def handle_request(self, req): return {"ok": True}

servers = [DummyServer() for _ in range(3)]
lb = MCPLoadBalancer(servers)
asyncio.run(lb.route_request({"context":"test"}))