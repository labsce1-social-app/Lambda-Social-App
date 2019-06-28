import React, { useState, useContext } from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import {
  Container,
  Content,
  ListItem,
  Header,
  Button,
  Text,
  Icon
} from 'native-base';

import { Store } from '../../context';

const DrawerButton = props => {
  const { state, dispatch } = useContext(Store);

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('PostADiscussion')}
    >
      {/* <Icon name="paper-plane" /> */}
      <Image
        style={{
          height: 40,
          width: 40,

          padding: 5
        }}
        source={require('../../assets/add-icon.png')}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
