import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content } from 'native-base';

class HomePage extends Component {
  render() {
    return (
      <View>
        <Text onPress={() => this.props.navigation.navigate('Posts')}>
          login
        </Text>
        <Text> HOme </Text>
      </View>
    );
  }
}

export default HomePage;
