import React, { useContext, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import Discussions from '../components/discussions/Discussions';

import Sort from '../components/discussions/Sort';

import { Container } from 'native-base';

import { Store } from '../context/';
import { getDiscussions, isAuthed } from '../utils/Requests';

// this home is referring to TopDiscussions component ONLY

const Home = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    isAuthed();
  }, () => isAuthed())

  useEffect(() => {
    getDiscussions(state.sortBy, dispatch);
  }, []);

  return (
    <Container>
      <Sort />
      <Discussions
        loading={state.top_discussions_loading}
        discussions={state.top_discussions}
      />
    </Container>
  );
};

export default withNavigation(Home);
