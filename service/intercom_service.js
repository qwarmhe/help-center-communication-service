const axios = require('axios');
const { INTERCOM_TOKEN } = require('../config/configuration');

// Fetch conversations from Intercom
async function fetchConversations(perPage = 20, startingAfter = '') {
    try {
        const response = await axios.get('https://api.intercom.io/conversations', {
            headers: {
                'Authorization': `Bearer ${INTERCOM_TOKEN}`,
                'Intercom-Version': '2.11'
            },
            params: {
                per_page: perPage,
                starting_after: startingAfter
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return null;
    }
}

// Reply to a conversation
async function replyToConversation(conversationId, message) {
    try {
        const response = await axios.post(`https://api.intercom.io/conversations/${conversationId}/reply`, {
            body: message,
            type: 'admin'
        }, {
            headers: {
                'Authorization': `Bearer ${INTERCOM_TOKEN}`,
                'Intercom-Version': '2.11'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error replying to conversation:', error);
    }
}

// Close a conversation
async function closeConversation(conversationId) {
    try {
        const response = await axios.post(`https://api.intercom.io/conversations/${conversationId}/close`, {}, {
            headers: {
                'Authorization': `Bearer ${INTERCOM_TOKEN}`,
                'Intercom-Version': '2.11'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error closing conversation:', error);
    }
}

module.exports = {
    fetchConversations,
    replyToConversation,
    closeConversation
};
