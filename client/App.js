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
import AsyncStorage from '@react-native-community/async-storage';

// this is where the entire app gets exported from, the context store provider is wrapped around here to give everything access to the store
export default (App = () => {
  useEffect(() => {
    checkPermission();
    // console.log(firebase);
  }, []);

  const checkPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        getToken();
      } else {
        requestPermission();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('DIDNT GET TOKEN', fcmToken);
      if (fcmToken) {
        // user has a device token
        console.log('GOT TOKEN', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

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
