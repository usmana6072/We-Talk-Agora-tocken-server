const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-token');

const app = express();
const APP_ID = '863d1af8f26c4e59815aee9fb0a9f414';
const APP_CERTIFICATE = '4fd508c5c7a0487590c3f889a7088764';

app.get('/getToken', (req, res) => {
    const channelName = req.query.channel;
    if (!channelName) return res.status(400).json({ 'error': 'channel is required' });

    const uid = 0; // 0 allows any UID
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTimestamp = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTimestamp);
    return res.json({ 'token': token });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));