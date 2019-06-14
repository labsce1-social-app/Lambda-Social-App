import React from 'react';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import { ScrollView } from 'react-native-gesture-handler';

// this home is referring to TopDiscussions component ONLY
// currently can be used for development
const Home = props => (
  <NavWrapper>
    <Header
    >
      Most Popular
    </Header>
    <Sort />
    <ScrollView>
      <TopDiscussions />
    </ScrollView>
  </NavWrapper>
);

export default Home;
