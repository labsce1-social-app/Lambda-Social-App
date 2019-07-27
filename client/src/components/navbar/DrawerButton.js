import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

const DrawerButton = props => {

  return (
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
      <Image
        style={{ width: 28, height: 28, marginLeft: 30, tintColor: '#dd2c00' }}
        source={require('../../assets/LSLogo1.png')}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
