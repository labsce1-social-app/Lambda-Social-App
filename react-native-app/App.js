import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// custom font loader for native base
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content } from 'native-base';

import AppNavigator from './AppNavigator';

// memory usage optimize for screen changing
import { useScreens } from 'react-native-screens';
useScreens();

export default class App extends React.Component {
  async componentDidMount() {
    // mount custom fonts for native base components
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
  }
  render() {
    return <AppNavigator />;
  }
}
