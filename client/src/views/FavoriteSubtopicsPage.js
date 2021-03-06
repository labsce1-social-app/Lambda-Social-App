import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
import { View, Text } from 'react-native';
import { getFavoriteSubtopics } from '../context/actions/subtopicActions';
// import { withNavigation } from 'react-navigation';
import { Container, Card, CardItem } from 'native-base';

import Subtopics from '../components/subtopics/Subtopics';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
const FavoriteSubtopics = props => {
  const { state, dispatch } = useContext(Store);


  useEffect(
    () => {
      loadFavorites(dispatch);
    },
    () => loadFavorites()
  );

  const loadFavorites = async dispatch => {
    if (state.isAuthenticated) {
      await getFavoriteSubtopics(dispatch, state.user.id);
    }
  };

  return (
    <Container>
      {state.isAuthenticated ? (
        <Subtopics subtopics={state.favorite_subtopics} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 14 }}>
            Log in first
          </Text>
        </View>
      )}
    </Container>
  );
};

export default FavoriteSubtopics;
