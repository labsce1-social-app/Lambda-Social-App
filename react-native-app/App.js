import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import reduxWrapper from './redux/reduxWrapper'

export default class App extends React.Component {
  render() {
    return (
      <reduxWrapper>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </reduxWrapper>
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
