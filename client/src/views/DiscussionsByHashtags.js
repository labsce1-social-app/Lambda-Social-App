import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import { getByHashtags } from '../utils/Requests';
import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';
import FabButton from '../components/discussions/FabButton';


// This component will retrieve discussions based on chosen hashtag in the search function
const DiscussionsByHashtags = props => {
    const { state, dispatch } = useContext(Store);
    const hashtag = props.navigation.getParam('hashtag');

    useEffect(() => {
        getByHashtags(dispatch, hashtag);
    }, [hashtag]);

    return (
        <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
            <Sort />
            <Discussions
                loading={state.discussions_loading}
                discussions={state.discussions}
            />
            {props.navigation.state.routeName === 'Discussions' &&
                state.isAuthenticated ? (
                    <FabButton />
                ) : null}
        </Container>
    );
};

// setting name of subtopic in header
DiscussionsByHashtags.navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('title')}`,
    headerTitleStyle: {
        fontSize: 16
    }
});

export default withNavigation(DiscussionsByHashtags);
