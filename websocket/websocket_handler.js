const WebSocket = require('ws');
const { verifyRequestSignature } = require('../middleware/security');
const {
    replyToConversation,
    closeConversation,
    fetchConversations,
    fetchConversationById
} = require('../service/intercom_service');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const token = req.url.split('token=')[1];

        // Verify request signature (token-based authentication)
        if (!verifyRequestSignature(token)) {
            ws.close();
            return;
        }

        console.log('Client connected');

        // Handle incoming messages from the client
        ws.on('message', async (message) => {
            const data = JSON.parse(message);

            try {
                if (data.action === 'list_conversations') {
                    // Fetch and send the list of conversations
                    const conversations = await fetchConversations(data.perPage, data.startingAfter);
                    ws.send(JSON.stringify({ action: 'list_conversations', conversations }));
                } else if (data.action === 'get_conversation_messages') {
                    // Fetch and send messages for a specific conversation
                    const conversationMessages = await fetchConversationById(data.conversationId);
                    ws.send(JSON.stringify({ action: 'get_conversation_messages', conversationMessages }));
                } else if (data.action === 'reply') {
                    // Reply to a conversation
                    await replyToConversation(data.conversationId, data.message, data.intercomUserId);
                    broadcastToClients(wss, { action: 'conversation_updated', conversationId: data.conversationId });
                } else if (data.action === 'close') {
                    // Close a conversation
                    await closeConversation(data.conversationId);
                    broadcastToClients(wss, { action: 'conversation_closed', conversationId: data.conversationId });
                }
            } catch (error) {
                console.error('Error processing WebSocket message:', error);
                ws.send(JSON.stringify({ action: 'error', message: 'An error occurred while processing your request.' }));
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
}

// Broadcast updates to all connected clients
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
