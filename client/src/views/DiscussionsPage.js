import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
// TODO: remove this later and place into it's own route
import Discussions from '../components/discussions/Discussions';
import { getDiscussionsForSub } from '../context/actions/discussionActions';
import { withNavigationFocus, withNavigation } from 'react-navigation';
import { Container } from 'native-base';
import FabButton from '../components/discussions/FabButton';
import FavoriteButton from '../components/subtopics/FavoriteButton';

// this DiscussionsPage is referring to all discussions inside of a chosen subtopic ONLY

const DiscussionsPage = props => {
  const { state, dispatch } = useContext(Store);
  const subId = props.navigation.getParam('subId');
  // const [favorited, setFavorited] = useState(false);
  //withNavigationFocus HOC gives access to isFocused props which returns a boolean
  // when the page is being focused. Using this as a subscription listener to see if the
  // component has changed
  useEffect(() => {
    getDiscussionsForSub(subId, dispatch);
  }, [props.isFocused]);

  // useEffect(() => {
  //   favoriteChecker()
  // }, [favorited]);

  // const favoriteChecker = () => {
  //   if (!isEmpty(state.favorite_subtopics)) {
  //     return state.favorite_subtopics.map((item) => {
  //       if (item.id === subId) {
  //         console.log("IT'S TRUEEEEEE")
  //         return setFavorited(true)
  //       }
  //     })
  //   } else {
  //     setFavorited(false)
  //   }
  // }

  // console.log(favorited)
  // const favorite = async (subId, userId) => {
  //   const sub = {
  //     subtopic_id: subId,
  //     user_id: userId
  //   };
  //   await favoriteTheSubtopic(dispatch, sub);
  //   Toast.show({
  //     text: `Favorited!`,
  //     buttonText: 'Ok'
  //   });
  //   setFavorited(true)
  // };

  // const unFavorite = async (subId, userId) => {
  //   const sub = {
  //     subId,
  //     userId
  //   };
  //   await unFavoriteTheSubtopic(dispatch, sub);
  //   Toast.show({
  //     text: `un favorited :|`,
  //     buttonText: 'Ok'
  //   });
  //   setFavorited(false)
  // };



  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <FavoriteButton
        subId={subId} />

      <Discussions
        loading={state.discussions_loading}
        discussions={state.discussions}
      />
      {
        props.navigation.state.routeName === 'Discussions' &&
          state.isAuthenticated ? (
            <FabButton />
          ) : null
      }
    </Container >
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
