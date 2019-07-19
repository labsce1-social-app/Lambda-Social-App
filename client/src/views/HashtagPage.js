import React, { useContext, useEffect } from 'react';
import { Store } from '../context/';
import { getHashtags } from '../context/actions/discussionActions';
import Hashtag from '../components/hashtags/Hashtag';
import { withNavigation } from 'react-navigation';
import { Container } from 'native-base';

const HashtagPage = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(
    () => {
      getHashtags(dispatch);
    },
    () => getHashtags()
  );

  return (
    <Container
      style={{
        backgroundColor: '#F6F8FA',
        width: '100%',
        padding: 10
      }}
    >
      <Hashtag loading={state.hashtags_loading} hashtags={state.hashtags} />
    </Container>
  );
};

// HashtagPage.navigationOptions = ({ navigation }) => ({
//   title: `${navigation.getParam('title')}`,
//   headerTitleStyle: {
//     fontSize: 16
//   }
// });

export default HashtagPage;