import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Store } from '../../context';
import UserProfile from './UserProfile';
import NavLinks from './NavLinks';

const DrawerContent = ({ navigation }) => {
  const { state, dispatch } = useContext(Store);

  return (
    <View style={styles.container}>
      <UserProfile user={state.user} />
      <NavLinks
        state={state}
        dispatch={dispatch}
        navigation={navigation}
        text={state.isAuthenticated === false ? 'Signin' : 'Signout'}
      />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#F7F7F7'
  }
});

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
