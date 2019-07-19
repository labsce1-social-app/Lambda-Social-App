import React, { useContext, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Icon, Toast } from 'native-base';

import { Store } from '../../context/';

const FavoritesTab = ({ navigation }) => {
  const { state, dispatch } = useContext(Store);

  const handleRoute = () => {
    if (state.isAuthenticated === false)
      Toast.show({
        text: 'You aint logged in!',
        buttonText: 'Ok'
      });
    else navigation.navigate('Favorited');
  };

  return (
    <Icon
      onPress={() => {
        handleRoute();
      }}
      name="md-star"
    />
  );
};

export default FavoritesTab;

{
  /* <TouchableOpacity onPress={() => navigation.navigate('Favorited')}>
</TouchableOpacity> */
}
