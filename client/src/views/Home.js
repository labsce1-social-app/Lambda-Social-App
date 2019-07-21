import React, { useContext, useEffect, useInterval } from 'react';
import { StatusBar } from 'react-native';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Discussions from '../components/discussions/Discussions';
import Sort from '../components/discussions/Sort';
import { Container } from 'native-base';
import { Store } from '../context/';
import { getDiscussions } from '../context/actions/discussionActions';
import { isAuthed } from '../context/actions/authActions';
import {
  getSubtopics,
  getFavoriteSubtopics
} from '../context/actions/subtopicActions';
import { getData } from '../utils/AsyncStorage';
import { isEmpty } from '../utils/utility';

// this home is referring to TopDiscussions component ONLY

const Home = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(
    () => {
      isAuthed(dispatch);
    },
    () => isAuthed()
  );

  // gather top discussions
  useEffect(() => {
    getDiscussions(state.sortBy, dispatch);
  }, [state.sortBy]);

  // gather all subtopics
  useEffect(
    () => {
      getSubtopics(dispatch);
    },
    () => getSubtopics
  );

  // gather favorited subs
  useEffect(
    () => {
      getUserSubs(dispatch);
    },
    () => getUserSubs()
  );

  // gather favorite subtopics helper function
  const getUserSubs = async dispatch => {
    let userId = await getData('accessToken');
    if (userId === null) {
      return null;
    } else {
      userId = userId.id;
      await getFavoriteSubtopics(dispatch, userId);
    }
  };

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

export default Home;
