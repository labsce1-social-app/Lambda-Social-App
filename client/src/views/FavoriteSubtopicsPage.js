import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
import { View, Text } from 'react-native';
import { getFavoriteSubtopics } from '../context/actions/subtopicActions';
// import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';

import Subtopics from '../components/subtopics/Subtopics';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
const FavoriteSubtopics = props => {
  const { state, dispatch } = useContext(Store);
  // console.log('IN FAVORITES USER ID ', state.user.id);

  useEffect(
    () => {
      getFavoriteSubtopics(dispatch, state.user.id);
    },
    () => getFavoriteSubtopics()
  ), [state.user.id];

  return (
    <Container>
      <Subtopics subtopics={state.favorite_subtopics} />
    </Container>
  );
};

FavoriteSubtopics.navigationOptions = ({ navigation }) => ({
  title: 'Favorite Subtopics',
  headerTitleStyle: {
    fontSize: 16
  }
})

export default FavoriteSubtopics;
