import React, { useContext, useEffect } from 'react';
import { Store } from '../context';
// TODO: remove this later and place into it's own route
import Discussions from '../components/discussions/Discussions';
import { getDiscussionsForSub } from '../context/discussions/discussions.actions';
import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';
import FabButton from '../components/discussions/FabButton';
import FavoriteButton from '../components/subtopics/FavoriteButton';
import { theme } from '../common/theme';


// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY

const DiscussionsPage = props => {
  const { state, dispatch } = useContext(Store);
  const subId = props.navigation.getParam('subId');

  const { discussions: { discussions, discussions_loading }, auth: { isAuthenticated } } = state;
  //withNavigationFocus HOC gives access to isFocused props which returns a boolean
  // when the page is being focused. Using this as a subscription listener to see if the
  // component has changed
  useEffect(() => {
    getDiscussionsForSub(subId, dispatch);
  }, []);

  return (
    <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
      <FavoriteButton subId={subId} />

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
DiscussionsPage.navigationOptions = ({ navigation }) => ({
  title: `${navigation.getParam('title')}`,
  headerTitleStyle: {
    fontSize: 16
  }
});

export default withNavigation(DiscussionsPage);
