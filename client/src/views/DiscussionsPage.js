import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Store } from '../context/';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import {
  getDiscussionsForSub,
  favoriteTheSubtopic,
  unFavoriteTheSubtopic
} from '../utils/Requests';
import { withNavigation } from 'react-navigation';
import { Container, Icon, Toast } from 'native-base';
import FabButton from '../components/discussions/FabButton';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY

const DiscussionsPage = props => {
  const { state, dispatch } = useContext(Store);
  const subId = props.navigation.getParam('subId');

  useEffect(() => {
    getDiscussionsForSub(subId, dispatch);
  }, [subId]);

  const favorite = async (subId, userId) => {
    const sub = {
      subtopic_id: subId,
      user_id: userId
    };

    await favoriteTheSubtopic(dispatch, sub);

    Toast.show({
      text: `Favorited!`,
      buttonText: 'Ok'
    });
  };

  const unFavorite = async (subId, userId) => {
    const sub = {
      subId,
      userId
    };

    await unFavoriteTheSubtopic(dispatch, sub);

    Toast.show({
      text: `un favorited :|`,
      buttonText: 'Ok'
    });
  };

  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-around',
          maxHeight: 30,
          marginBottom: 20
        }}
      >
        <TouchableOpacity onPress={() => unFavorite(subId, state.user.id)}>
          <Icon name="close-circle" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => favorite(subId, state.user.id)}>
          <Icon name="add-circle" />
        </TouchableOpacity>
      </View>

      <Sort />
      <Discussions
        loading={state.discussions_loading}
        discussions={state.discussions}
      />
      {props.navigation.state.routeName === 'Discussions' &&
      state.isAuthenticated ? (
        <FabButton />
      ) : null}
    </Container>
  );
};

// setting name of subtopic in header
DiscussionsPage.navigationOptions = ({ navigation }) => ({
  title: `${navigation.getParam('title')}`,
  headerTitleStyle: {
    fontSize: 16
  }
});

export default withNavigation(DiscussionsPage);
