require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    WS_PORT: process.env.WS_PORT || 8080,
    INTERCOM_TOKEN: process.env.INTERCOM_TOKEN,
    WS_TOKEN: process.env.WS_TOKEN
};
