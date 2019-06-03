import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// custom font loader for native base
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
// components
import NativeButton from './src/common/NativeButton'
import IconButton from './src/common/IconButton'

export default class App extends React.Component {

  async componentDidMount() {
    // mount custom fonts for native base components
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <NativeButton primary>Button</NativeButton>
        <IconButton
      </View>
      );
    }
  }
  
const styles = StyleSheet.create({
          container: {
          flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
