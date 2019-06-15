import React from 'react';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';

// this home is referring to TopDiscussions component ONLY
const Home = props => (
  <NavWrapper>
    <Header
    >
      Most Popular
    </Header>
    <Sort />
    <TopDiscussions />
  </NavWrapper>
);

export default Home;
