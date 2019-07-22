import React, { useEffect } from 'react';
import AppNavigator from './AppNavigator';
import { Root, StyleProvider } from 'native-base';
import { StoreProvider } from './src/context/';
import getTheme from './native-base-theme/components';
import { darkTheme } from './native-base-theme/variables/darkTheme';
import material from './native-base-theme/variables/material';
import io from 'socket.io-client';
import { LOCAL, IP } from 'react-native-dotenv';

// this is where the entire app gets exported from, the context store provider is wrapped around here to give everything access to the store
export default (App = () => {
  useEffect(() => {
    //needs local ip address
    // for windows use ipconfig in terminal
    // for mac use ifconfig in terminal
    // const socket = io(`http://192.168.68.128:3000`);
    const socket = io(LOCAL);
  }, [])

  return (
    <StyleProvider style={getTheme(darkTheme)}>
      <StoreProvider>
        <Root>
          <AppNavigator />
        </Root>
      </StoreProvider>
    </StyleProvider>
  )
});
