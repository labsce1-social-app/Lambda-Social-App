import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import { getDiscussionsForSub } from '../utils/Requests';
import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';
import FabButton from '../components/discussions/FabButton';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
const DiscussionsPage = props => {
  const { state, dispatch } = useContext(Store);
  const subId = props.navigation.getParam('subId');

  useEffect(() => {
    getDiscussionsForSub(subId, dispatch);
  }, []);

  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <Sort />
      <Discussions
        loading={state.discussions_loading}
        discussions={state.discussions}
      />
      {props.navigation.state.routeName === 'Discussions' && state.isAuthenticated ? <FabButton /> : null}
    </Container>
  )
};

export default withNavigation(DiscussionsPage);
