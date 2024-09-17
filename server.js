
const express = require('express');
const https = require('https');
const fs = require('fs');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const { PORT, WS_PORT } = require('./config/configuration');
const webhookRouter = require('./routes/webhook');
const { setupWebSocketServer } = require('./websocket/websocket_handler');

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup
const wss = setupWebSocketServer(server);
app.set('wss', wss);

// Routes
app.use('/webhook', webhookRouter);

// Start HTTP server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});