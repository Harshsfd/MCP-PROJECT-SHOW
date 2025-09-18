# mcp_ai_integration.py
import os, asyncio, json
from aiohttp import web, ClientSession

OPENAI_KEY = os.getenv('OPENAI_API_KEY')

async def call_llm(prompt):
    headers = {"Authorization": f"Bearer {OPENAI_KEY}","Content-Type": "application/json"}
    payload = {"model":"gpt-4o-mini","input":prompt}
    async with ClientSession() as session:
        async with session.post("https://api.openai.com/v1/responses", json=payload, headers=headers) as resp:
            data = await resp.json()
            return data.get('output',[{}])[0].get('content','')

async def handle(request):
    body = await request.json()
    context = body.get('context', {})
    user_query = body.get('query', '')
    ctx_text = "\n".join([f"{k}: {v}" for k,v in context.items()])
    prompt = f"Context:\n{ctx_text}\n\nUser: {user_query}\nAssistant:"
    answer = await call_llm(prompt)
    return web.json_response({"status":"ok","answer":answer})

app = web.Application()
app.router.add_post("/ask", handle)
if __name__ == '__main__':
    web.run_app(app, port=8081)