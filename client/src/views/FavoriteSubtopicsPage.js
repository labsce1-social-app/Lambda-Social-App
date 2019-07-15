import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
import { View, Text } from 'react-native';
import { getFavoriteSubtopics } from '../utils/Requests';
// import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
const FavoriteSubtopics = props => {
  const { state, dispatch } = useContext(Store);
  console.log('IN FAVORITES USER ID ', state.user.id);

  useEffect(
    () => {
      getFavoriteSubtopics(dispatch, state.user.id);
    },
    () => getFavoriteSubtopics()
  );

  return (
    <Container>
      <Text>IN FAVORITES</Text>
    </Container>
  );
};

export default FavoriteSubtopics;
