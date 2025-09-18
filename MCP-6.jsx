import jwt, bcrypt
from cryptography.fernet import Fernet
from datetime import datetime, timedelta
import json

class MCPSecurityManager:
    def __init__(self, secret_key, encryption_key):
        self.secret_key = secret_key
        self.cipher = Fernet(encryption_key)
        self.active_tokens = set()
    
    async def authenticate_user(self, username, password):
        user = await self.get_user(username)
        if not user: return None
        if bcrypt.checkpw(password.encode(), user['password_hash']):
            return self.generate_token(user)
        return None
    
    def generate_token(self, user):
        payload = {'user_id': user['id'], 'username': user['username'], 'roles': user['roles'], 'exp': datetime.utcnow() + timedelta(hours=24), 'iat': datetime.utcnow()}
        token = jwt.encode(payload, self.secret_key, algorithm='HS256')
        self.active_tokens.add(token)
        return token