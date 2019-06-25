import React from 'react';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import NavWrapper from './NavWrapper';

// this home is referring to TopDiscussions component ONLY
// history is being pushed to component for route pushing/popping purposes
const Home = props => {
  return (
    <NavWrapper text={props.text}>
      <Sort />
      <TopDiscussions history={props.history} />
    </NavWrapper>
  )
};

export default Home;
