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
      title: 'Subbed',
      body: 'All worked out'
    },
    // token: registrationToken
    topic: 'subtopic'
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

const subNotificationsBySubtopic = () => {
  let registrationTokens = [
    'dbC55Tlf-xI:APA91bF1YCxO8V1wBcRzmsADCAq-RX_NJuS6b2wcTyrxkJ9O-G_GWjiU0_4o3uSnPGx32HwU5wZLEOlfZzhmf3L2-_dqkYQUa9VmLobC2DJZhfSyuHZx5oDpt0dbYBvHejyyDeH5y8UE'
  ];

  let topic = 'subtopic'; // take in subtopic title

  admin
    .messaging()
    .subscribeToTopic(registrationTokens, topic)
    .then(function(response) {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully subscribed to topic:', response);
    })
    .catch(function(error) {
      console.log('Error subscribing to topic:', error);
    });
};

module.exports = {
  sendPush,
  subNotificationsBySubtopic
};
