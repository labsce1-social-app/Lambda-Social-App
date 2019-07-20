import React, { useContext, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Icon, Toast } from 'native-base';

import { Store } from '../../context/';

const FavoritesTab = props => {
  const { state, dispatch } = useContext(Store);

  const handleRoute = () => {
    if (state.isAuthenticated === false)
      Toast.show({
        text: 'Login first',
        buttonText: 'Ok'
      });
    else navigation.navigate('Favorited');
  };

  return (
    <Icon
      style={{
        color: props.tintColor
      }}
      onPress={() => props.navigation.navigate('Favorited')}
      name="md-star"
    />
  );
};

export default FavoritesTab;
