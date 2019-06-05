import React from 'react';
import { Text, View } from 'react-native';
import { Content } from 'native-base';


const HomePage = props => {
  return (
    <View>
      <Text>Home</Text>
      <Text onPress={() => props.navigation.navigate('Login')}>login</Text>
    </View>
  );
};

export default HomePage;
