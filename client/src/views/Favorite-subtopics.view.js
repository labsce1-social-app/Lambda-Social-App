import React, { useContext, useEffect } from 'react';
import { Store } from '../context';
import { View, Text } from 'react-native';
import { getFavoriteSubtopics } from '../context/subtopics/subtopics.actions';
// import { withNavigation } from 'react-navigation';
import { Container, Card, CardItem } from 'native-base';

import Subtopics from '../components/subtopics/Subtopics';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
const FavoriteSubtopics = props => {
  const { state, dispatch } = useContext(Store);
  const { auth: { isAuthenticated, user }, subtopics: { favorite_subtopics } } = state;

  useEffect(
    () => {
      loadFavorites(dispatch);
    },
    () => loadFavorites()
  );

  const loadFavorites = async dispatch => {
    if (isAuthenticated) {
      await getFavoriteSubtopics(dispatch, user.id);
    }
  };

  return (
    <Container>
      {isAuthenticated ? (
        <Subtopics subtopics={favorite_subtopics} />
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
