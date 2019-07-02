import React, { useEffect, useContext } from 'react';
import { Store } from '../context';
import Post from '../components/posts/Post';
import FabButton from '../components/posts/FabButton';
import { getCommentsByDiscussionId } from '../utils/Requests';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';


const PostPage = props => {
  // handle life cycle for comments
  const { state, dispatch } = useContext(Store);

  const postId = props.navigation.getParam('postId', 'None');

  // need to get the data here because it is where we have access to the id from react router.

  // useEffect is treated as componentDidMount and componentWillUnmount
  useEffect(
    () => {
      getCommentsByDiscussionId(JSON.stringify(postId), dispatch);
    },
    () => getCommentsByDiscussionId()
  );

  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <Post />
      {state.isAuthenticated ? <FabButton /> : null}
    </Container>
  )
  // return <Thread />
};
export default withNavigation(PostPage);
