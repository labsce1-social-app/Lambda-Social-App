import React from 'react';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import NavWrapper from './NavWrapper';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
// TODO: we'll need to make the header dynamic
const DiscussionsPage = props => (
    <NavWrapper>
        <Sort />
        <Discussions history={props.history} />
    </NavWrapper>
);

export default DiscussionsPage;
