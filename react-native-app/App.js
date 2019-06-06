import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import AppNavigator from './AppNavigator';
// custom font loader for native base
import * as Font from 'expo-font';

// memory usage optimize for screen changing
import { useScreens } from 'react-native-screens';
import Wrapper from './src/components/Wrapper';
import NativeHeader from './src/common/NativeHeader';
// useScreens();

export default class App extends React.Component {
  state = {
    loading: false
  };

  async componentWillMount() {
    // mount custom fonts for native base components
    try {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      });

      this.setState({ loading: true });
    } catch (error) {
      console.log('error loading fonts: ', error);
    }
  }

  render() {
    const { loading } = this.state;
    if (!loading) {
      return <AppLoading />;
    }
    return (
      <Wrapper>
        <NativeHeader />
        <AppNavigator />
      </Wrapper>
    );
  }
}
