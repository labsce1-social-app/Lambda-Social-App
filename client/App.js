import React, { Component } from 'react';
// memory usage optimize for screen changing
import { useScreens } from 'react-native-screens';
import Wrapper from './src/components/Wrapper';
import NativeHeader from './src/components/navbar/NativeHeader';
import AppNavigator from './AppNavigator';

useScreens();


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
export default class App extends Component {
  state = {
    loading: false
  };

  // async componentWillMount() {
  //   // mount custom fonts for native base components
  //   try {
  //     await Font.loadAsync({
  //       Roboto: require('native-base/Fonts/Roboto.ttf'),
  //       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
  //     });

  //     this.setState({ loading: true });
  //   } catch (error) {
  //     console.log('error loading fonts: ', error);
  //   }
  // }

  render() {
    // const { loading } = this.state;
    // if (!loading) {
    //   return <Text>Loading...</Text>;
    // }
    return (
      <Wrapper>
        <NativeHeader />
        <AppNavigator />
      </Wrapper>
    );
  }
};
