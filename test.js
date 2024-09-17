// require('dotenv').config();
// const express = require('express');
// const WebSocket = require('ws');
// const { verifyRequestSignature } = require('./middleware/security');
// const cors = require('cors');
// const helmet = require('helmet');
// const app = express();
//
// app.use(cors());
// app.use(helmet());
// app.use(express.json());
//
// // WebSocket setup
// const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });
//
// // Connection handling
// wss.on('connection', (ws) => {
//     console.log('Client connected');
//
//     ws.on('message', (message) => {
//         console.log('Received message:', message);
//         // Process the message and reply to the client if necessary
//     });
//
//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });
//
// // Intercom webhook handler
// app.post('/webhook/intercom',  (req, res) => {
//     const { body } = req;
//
//     // Handle incoming events from Intercom
//     console.log('Received Intercom Webhook:', body);
//
//     // Broadcast data to all connected WebSocket clients
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(body));
//         }
//     });
//
//     res.status(200).send('Webhook received');
// });
//
// wss.on('connection', (ws) => {
//     ws.on('message', async (message) => {
//         const data = JSON.parse(message);
//
//         if (data.action === 'reply') {
//             await replyToConversation(data.conversationId, data.message);
//         } else if (data.action === 'close') {
//             await closeConversation(data.conversationId);
//         }
//     });
// });
//
// // Function to reply to a conversation
// async function replyToConversation(conversationId, message) {
//     try {
//         const response = await axios.post(`https://api.intercom.io/conversations/${conversationId}/reply`, {
//             body: message,
//             type: 'admin'
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.INTERCOM_TOKEN}`,
//                 'Intercom-Version': '2.11'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error replying to conversation:', error);
//     }
// }
//
// // Function to close a conversation
// async function closeConversation(conversationId) {
//     try {
//         const response = await axios.post(`https://api.intercom.io/conversations/${conversationId}/close`, {}, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.INTERCOM_TOKEN}`,
//                 'Intercom-Version': '2.11'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error closing conversation:', error);
//     }
// }
//
//
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
