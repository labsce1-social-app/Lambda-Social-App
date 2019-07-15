import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import { getDiscussionsForSub } from '../context/actions/discussionActions';
import { withNavigationFocus, withNavigation } from 'react-navigation';
import { Container } from 'native-base';
import FabButton from '../components/discussions/FabButton';
// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY

const DiscussionsPage = props => {
  const { state, dispatch } = useContext(Store);
  const subId = props.navigation.getParam('subId');

  //withNavigationFocus HOC gives access to isFocused props which returns a boolean
  // when the page is being focused. Using this as a subscription listener to see if the
  // component has changed
  useEffect(
    () => {
      getDiscussionsForSub(subId, dispatch);
    }, [props.isFocused]);

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
DiscussionsPage.navigationOptions = ({ navigation }) => ({
  title: `${navigation.getParam('title')}`,
  headerTitleStyle: {
    fontSize: 16
  }
});

export default withNavigationFocus(withNavigation(DiscussionsPage));
