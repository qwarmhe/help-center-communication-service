const WebSocket = require('ws');
const { verifyRequestSignature } = require('../middleware/security');
const { replyToConversation, closeConversation } = require('../service/intercom_service');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const token = req.url.split('token=')[1];

        if (!verifyRequestSignature(token)) {
            ws.close();
            return;
        }

        console.log('Client connected');

        ws.on('message', async (message) => {
            const data = JSON.parse(message);

            if (data.action === 'reply') {
                await replyToConversation(data.conversationId, data.message);
            } else if (data.action === 'close') {
                await closeConversation(data.conversationId);
            }

            // Add any further logic for received messages
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
}

function broadcastToClients(wss, data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = {
    setupWebSocketServer,
    broadcastToClients
};
