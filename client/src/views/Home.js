import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import Discussions from '../components/discussions/Discussions';
import Sort from '../components/discussions/Sort';
import { Container } from 'native-base';
import { Store } from '../context/';
import { getDiscussions } from '../context/actions/discussionActions';
import { isAuthed } from '../context/actions/authActions';
import { getSubtopics } from '../context/actions/subtopicActions';

// this home is referring to TopDiscussions component ONLY

const Home = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(
    () => {
      isAuthed(dispatch);
    },
    () => isAuthed()
  );

  useEffect(
    () => {
      getSubtopics(dispatch);
    }, () => getSubtopics()
  );

  useEffect(() => {
    getDiscussions(state.sortBy, dispatch);
  }, [state.sortBy]);

  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Sort />
      <Discussions
        loading={state.top_discussions_loading}
        discussions={state.top_discussions}
      />
    </Container>
  );
};

export default withNavigation(Home);
