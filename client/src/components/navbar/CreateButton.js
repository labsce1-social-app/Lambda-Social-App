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
      style={{
        backgroundColor: '#BB1333',
        borderRadius: 100,
        marginBottom: 6,
        // shadowOpacity: 1,
        // shadowRadius: 8,
        elevation: 2
      }}
      onPress={() => props.navigation.navigate('PostADiscussion')}
    >
      {/* <Icon name="paper-plane" /> */}
      <Image
        style={{
          height: 50,
          width: 50
        }}
        source={require('../../assets/add-icon.png')}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
