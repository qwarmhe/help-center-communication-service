// server/services/webSocketService.js
let webSocketServer = null;

exports.initializeWebSocketServer = (wss) => {
    webSocketServer = wss;
};

// Function to broadcast data to all connected WebSocket clients
exports.broadcastToClients = (data) => {
    if (!webSocketServer) {
        console.error('WebSocket server is not initialized.');
        return;
    }

    webSocketServer.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
