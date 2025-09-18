class MCPClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.ws = null;
    this.contexts = new Map();
    this.eventHandlers = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.serverUrl);
      this.ws.onopen = () => { console.log('Connected to MCP server'); resolve(true); };
      this.ws.onmessage = (event) => { this.handleMessage(JSON.parse(event.data)); };
      this.ws.onerror = (error) => { reject(error); };
    });
  }

  async sendContext(contextId, data) {
    const message = { type: 'context_update', contextId, data, timestamp: Date.now() };
    this.ws.send(JSON.stringify(message));
  }

  handleMessage(message) {
    const handler = this.eventHandlers.get(message.type);
    if (handler) handler(message);
  }
}