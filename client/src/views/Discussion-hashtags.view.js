import React, { useContext, useEffect } from 'react';
import { Store } from '../context';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import { getByHashtags } from '../context/discussions/discussions.actions';
import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';
import FabButton from '../components/discussions/FabButton';
import { theme } from '../common/theme';



// This component will retrieve discussions based on chosen hashtag in the search function
const DiscussionsByHashtags = props => {
    const { state, dispatch } = useContext(Store);
    const hashtag = props.navigation.getParam('hashtag');

    const { discussions: { discussions_loading, discussions }, auth: { isAuthenticated } } = state
    useEffect(() => {
        getByHashtags(dispatch, hashtag);
    }, [hashtag]);

    return (
        <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
            <Sort />
            <Discussions
                loading={discussions_loading}
                discussions={discussions}
            />
            {props.navigation.state.routeName === 'Discussions' &&
                isAuthenticated ? (
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
