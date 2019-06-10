import React, { Component } from 'react';
// memory usage optimize for screen changing
import { useScreens } from 'react-native-screens';
import Wrapper from './src/components/Wrapper';
import NativeHeader from './src/components/navbar/NativeHeader';
import AppNavigator from './AppNavigator';
// import { Text } from 'native-base';
import { StoreProvider } from './src/context/';
useScreens();


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
export default class App extends Component {

  render() {
    // const { loading } = this.state;
    // if (!loading) {
    //   return <Text>Loading...</Text>;
    // }
    return (
      <StoreProvider>

        <Wrapper>
          <NativeHeader />
          <AppNavigator />
        </Wrapper>
      </StoreProvider>
    );
  }
};
