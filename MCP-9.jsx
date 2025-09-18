import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger('mcp_logger')
logger.setLevel(logging.INFO)
handler = RotatingFileHandler('mcp.log', maxBytes=1000000, backupCount=5)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

def log_event(event_type, data):
    logger.info(f"{event_type}: {data}")
    
log_event("ServerStart", {"status": "ok"})