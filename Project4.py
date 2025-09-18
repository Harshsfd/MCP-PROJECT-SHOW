import asyncio, json
import asyncpg
from motor.motor_asyncio import AsyncIOMotorClient
import aioredis
from datetime import datetime

class MCPDatabaseConnector:
    def __init__(self, db_configs):
        self.configs = db_configs
        self.postgres = None
        self.mongo = None
        self.redis = None
    
    async def initialize_connections(self):
        self.postgres = await asyncpg.connect(self.configs['postgres']['url'])
        self.mongo = AsyncIOMotorClient(self.configs['mongo']['url']).mcp_database
        self.redis = await aioredis.create_redis_pool(self.configs['redis']['url'])
    
    async def store_context(self, context_id, context_data):
        await self.postgres.execute(
            "INSERT INTO contexts (id, data, created_at) VALUES ($1, $2, NOW())",
            context_id, json.dumps(context_data)
        )
        await self.mongo.contexts.insert_one({"_id": context_id, "data": context_data, "timestamp": datetime.utcnow()})
        await self.redis.setex("context:" + context_id, 3600, json.dumps(context_data))