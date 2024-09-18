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
async function replyToConversation(conversationId, message, intercomUserId) {
    try {
        const response = await axios.post(`https://api.intercom.io/conversations/${conversationId}/reply`, {
            message_type: 'comment',
            type: 'user',
            intercom_user_id: intercomUserId,
            body: message
        }, {
            headers: {
                'Authorization': `Bearer ${INTERCOM_TOKEN}`,
                'Intercom-Version': '2.11',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error replying to conversation:', error);
        return null;
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
        return null;
    }
}

// Fetch conversation messages by ID
async function fetchConversationById(conversationId, displayAs = 'string') {
    try {
        const response = await axios.get(`https://api.intercom.io/conversations/${conversationId}`, {
            headers: {
                'Authorization': `Bearer ${INTERCOM_TOKEN}`,
                'Intercom-Version': '2.11'
            },
            params: {
                display_as: displayAs
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching conversation ${conversationId}:`, error);
        return null;
    }
}

module.exports = {
    fetchConversations,
    replyToConversation,
    closeConversation,
    fetchConversationById
};
