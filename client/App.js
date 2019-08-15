import React, { useEffect } from 'react';
import AppNavigator from './AppNavigator';
import { Root, StyleProvider } from 'native-base';
import { StoreProvider } from './src/context/';
import getTheme from './native-base-theme/components';
import { darkTheme } from './native-base-theme/variables/darkTheme';
import material from './native-base-theme/variables/material';
import io from 'socket.io-client';
// import { LOCAL, IP } from 'react-native-dotenv';
import firebase from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';
import { getData, storeData } from './src/utils/AsyncStorage';

import { Alert } from 'react-native';

// this is where the entire app gets exported from, the context store provider is wrapped around here to give everything access to the store
export default (App = () => {
  useEffect(() => {
    getfcmToken();
  }, []);

  const getfcmToken = async () => {
    let pushToken = await getData('deviceToken');

    if (!pushToken) {
      pushToken = await firebase.messaging().getToken();

      if (pushToken) {
        await storeData('deviceToken', pushToken);
      }
    }

    await configure();

    // console.log(pushToken);
  };

  const configure = () => {
    // console.log('call configure');
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      senderID: '590428820475',

      onRegister: token => {
        console.log('TOKEN:', token);

        Alert.alert(
          'Alert Title',
          `TOKEN ${token}`,
          [
            {
              text: 'Ask me later',
              onPress: () => console.log('Ask me later pressed')
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  };
  // PushNotification.requestPermissions('590428820475');

  return (
    <StyleProvider style={getTheme(darkTheme)}>
      <StoreProvider>
        <Root>
          <AppNavigator />
        </Root>
      </StoreProvider>
    </StyleProvider>
  );
});
