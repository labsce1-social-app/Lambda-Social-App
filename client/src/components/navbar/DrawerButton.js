import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

const DrawerButton = props => {

  return (
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
      <Image
        style={{ width: 28, height: 28, marginLeft: 9 }}
        source={require('../../assets/Lambda_Logo_Red.png')}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
