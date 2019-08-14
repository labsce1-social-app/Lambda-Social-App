const admin = require('firebase-admin');

const serviceAccount = require('../../../server/firebaseAdminSDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://neral-app.firebaseio.com'
});

const sendPush = () => {
  let registrationToken =
    'dbC55Tlf-xI:APA91bF1YCxO8V1wBcRzmsADCAq-RX_NJuS6b2wcTyrxkJ9O-G_GWjiU0_4o3uSnPGx32HwU5wZLEOlfZzhmf3L2-_dqkYQUa9VmLobC2DJZhfSyuHZx5oDpt0dbYBvHejyyDeH5y8UE';

  let message = {
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    token: registrationToken
  };

  let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};

module.exports = {
  sendPush
};
