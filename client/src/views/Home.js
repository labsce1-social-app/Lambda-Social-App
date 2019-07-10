import React, { useContext, useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import Discussions from '../components/discussions/Discussions';
import { isEmpty } from '../utils/utility';
import Sort from '../components/discussions/Sort';

import { Container } from 'native-base';

import { Store } from '../context/';
import { getDiscussions, isAuthed, getSubtopics } from '../utils/Requests';

// this home is referring to TopDiscussions component ONLY

const Home = props => {
  const { state, dispatch } = useContext(Store);
  const [user_id, setUserId] = useState('null')

  useEffect(() => {
    isAuthed(dispatch);
  }, () => isAuthed())

  useEffect(
    () => {
      getSubtopics(dispatch);
    }, () => getSubtopics()
  );

  useEffect(() => {
    // checks if user exists in state because
    // getDiscussions will need it to see if the
    // user has voted on the discussions present,
    // else it will pass null if user not logged in.
    // this will give us a generic list where upvotes
    // won't be personalized to a user.
    if (!isEmpty(state.user)) {
      setUserId(state.user.id)
    }
    getDiscussions(state.sortBy, dispatch, user_id);
  }, () => getDiscussions());

  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <Sort />
      <Discussions
        loading={state.top_discussions_loading}
        discussions={state.top_discussions}
      />
    </Container>
  );
};

export default withNavigation(Home);
