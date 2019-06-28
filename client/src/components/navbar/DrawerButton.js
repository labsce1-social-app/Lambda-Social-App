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
  Text
} from 'native-base';

import { Store } from '../../context';

const DrawerButton = props => {
  const { state, dispatch } = useContext(Store);

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
