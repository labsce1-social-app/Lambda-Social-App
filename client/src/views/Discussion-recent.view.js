import React, { useContext, useEffect } from 'react';
import { Store } from '../context';
// TODO: remove this later and place into it's own route
import Discussions from '../components/discussions/Discussions';
import { getRecentDiscussions } from '../context/actions/discussion.actions';
import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY
const DiscussionsPage = props => {
    const { state, dispatch } = useContext(Store);
    const subId = props.navigation.getParam('subId');

    useEffect(() => {
        getRecentDiscussions(subId, dispatch);
    }, () => getRecentDiscussions());

    return (
        <Container>
            <Discussions
                loading={state.discussions_loading}
                discussions={state.discussions}
            />
        </Container>
    )
};

export default withNavigation(DiscussionsPage);
