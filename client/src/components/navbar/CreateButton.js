import React, { useContext } from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { Toast } from 'native-base';

import { Store } from '../../context';

const DrawerButton = ({ navigation }) => {
  const { state, dispatch } = useContext(Store);

  const handleModal = () => {

    if (state.isAuthenticated === false) {
      Toast.show({
        text: 'You must be logged in!',
        buttonText: 'Okay',
        type: 'danger',
        duration: 5000
      })
    }
  }

  return (
    <TouchableOpacity
      style={{
        // backgroundColor: '#d9534f',
        borderRadius: 100,
        // marginBottom: 6,
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // elevation: 2
      }}
      onPress={() => handleModal()}
    >
      <Image
        style={{
          height: 50,
          width: 50
        }}
        source={require('../../assets/add-button-shine.png')}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
