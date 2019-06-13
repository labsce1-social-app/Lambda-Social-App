import React from 'react';
// memory usage optimize for screen changing
import { useScreens } from 'react-native-screens';
import AppNavigator from './AppNavigator';
import { StoreProvider } from './src/context/';

useScreens();

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default App = () => (
  <StoreProvider>
    <AppNavigator />
  </StoreProvider>
)