import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { Container, Content, ListItem, Header, Button } from 'native-base';

import { withNavigation } from 'react-navigation';

import { handleAuth, handleLogout } from '../../utils/Requests';
import { Store } from '../../context';

const DrawerContent = props => {
  const { state, dispatch } = useContext(Store);

  return (
    <ScrollView>
      <Text>Drawer</Text>

      {state.isAuthenticated === false ? (
        <Text
          style={{ padding: 10, border: '2px solid blue' }}
          title="login"
          onPress={() => {
            handleAuth(dispatch);
            props.navigation.closeDrawer();
          }}
        >
          LOGIN
        </Text>
      ) : (
        <Text
          style={{ padding: 10, border: '2px solid blue' }}
          title="logout"
          onPress={() => {
            handleLogout(dispatch);
            props.navigation.closeDrawer();
          }}
        >
          LOGOUT
        </Text>
      )}
    </ScrollView>
  );
};

export default withNavigation(DrawerContent);

/***Dynamic way of listing routes if we want to add routes to drawer */

// const routes = ['route', 'route'];

{
  /* <FlatList
            data={routes}
            renderItem={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.item)}
                  style={{ padding: 5 }}
                >
                  <Text>{data.item}</Text>
                </ListItem>
              );
            }}
          /> */
}
