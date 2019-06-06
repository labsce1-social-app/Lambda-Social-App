import React from 'react';
import { Text, View } from 'react-native';
import { Content } from 'native-base';

class HomePage extends Component {
  // static navigationOptions = {
  //   header: null
  // };
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
