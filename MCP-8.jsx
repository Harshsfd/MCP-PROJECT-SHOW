// jest unit test: tests/mcp-client.test.js
const WebSocket = require('ws');
const MCPClient = require('../src/mcp-client');

test('client connects and receives welcome', async () => {
  const client = new MCPClient('ws://localhost:8080');
  await client.connect();
  const welcome = await client.waitFor('welcome', 2000);
  expect(welcome.type).toBe('welcome');
  client.close();
});