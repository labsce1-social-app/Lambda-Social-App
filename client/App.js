import React, { useEffect, useState } from 'react';
import AppNavigator from './AppNavigator';
import { StoreProvider } from './src/context/';
import { NativeRouter } from 'react-router-native';
import { LOCAL, BASE_URL } from 'react-native-dotenv';
import socketIO from "socket.io-client";
const base_dmn = '54.209.219.69.:443'
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// this is where the entire app gets exported from, the context store provider is wrapped around here to give everything access to the store
export default App = () => {
  useEffect(() => {
    // LOCAL will need to be replaced with heroku domain URL
    const socket = socketIO(base_dmn, {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();
    socket.on('connect', () => {
      console.log('connected to socket server');
    });
  }, [])
  return (
    <NativeRouter>
      <StoreProvider>
        <AppNavigator />
      </StoreProvider>
    </NativeRouter>
  )
}