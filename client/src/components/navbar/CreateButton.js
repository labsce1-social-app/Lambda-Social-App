import React, { useContext } from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

import { Store } from '../../context';

const DrawerButton = ({ navigation }) => {
  const { state, dispatch } = useContext(Store);

  const handleModal = () => {
    console.log(navigation.state.routeName)
    // if (props.navigation.state.routeName === 'Subtopics') {
    //   return props.navigation.navigate('Modal')
    // }
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
