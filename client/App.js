import React from 'react';
import AppNavigator from './AppNavigator';
import { StoreProvider } from './src/context/';
import { NativeRouter } from 'react-router-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// this is where the entire app gets exported from, the context store provider is wrapped around here to give everything access to the store
export default App = () => (
  <NativeRouter>
    <StoreProvider>
      <AppNavigator />
    </StoreProvider>
  </NativeRouter>
)