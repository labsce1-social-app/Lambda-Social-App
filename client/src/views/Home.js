import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import NavWrapper from './NavWrapper';

import { Container } from 'native-base';

import React, { useContext, lazy, Suspense, useEffect } from 'react';
import { Store } from '../context/';
import { getDiscussions } from '../utils/Requests';
import { Text } from 'react-native';

// this home is referring to TopDiscussions component ONLY
// history is being pushed to component for route pushing/popping purposes
const Home = props => {
  const { state, dispatch } = useContext(Store);

  return (
    <Container>
      <Sort />

      <TopDiscussions />
    </Container>
  );
};

export default Home;
