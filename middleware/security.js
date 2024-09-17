const crypto = require('crypto');

const verifyRequestSignature = (req, res, next) => {
    const signature = req.headers['x-hub-signature'];
    const expectedSignature = crypto
        .createHmac('sha1', process.env.INTERCOM_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (signature === expectedSignature) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = { verifyRequestSignature };
