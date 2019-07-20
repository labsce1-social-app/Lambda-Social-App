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
  // console.log('IN FAVORITES USER ID ', state.user.id);

  useEffect(
    () => {
      let user_id;
      if (state.user) {
        user_id = state.user.id;
      } else {
        user_id = 'null'
      }
      getFavoriteSubtopics(dispatch, user_id);
    },
    [state.user]
  );

  return (
    <Container>
      {state.isAuthenticated === true ?
        <Subtopics subtopics={state.favorite_subtopics} />
        : <Card>
          <CardItem>
            <Text>Please Sign in</Text>
          </CardItem>
        </Card>}
    </Container>
  );
};

export default FavoriteSubtopics;
