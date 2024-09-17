const express = require('express');
const { broadcastToClients } = require('../websocket/websocket_handler');
const router = express.Router();

router.post('/intercom', (req, res) => {
    const { body } = req;

    // Log and process the webhook data
    console.log('Received Intercom Webhook:', body);

    // Broadcast data to WebSocket clients
    const wss = req.app.get('wss');
    broadcastToClients(wss, body);

    res.status(200).send('Webhook received');
});

module.exports = router;
