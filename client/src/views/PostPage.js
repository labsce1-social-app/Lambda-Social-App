import React, { useEffect, useContext } from 'react';
import { Store } from '../context';
import NavWrapper from './NavWrapper';
import Post from '../components/posts/Post';
import { getCommentsByDiscussionId } from '../utils/Requests';

const PostPage = props => {
  // handle life cycle for comments
  const { dispatch } = useContext(Store);

  const postId = props.navigation.getParam('postId', 'None');

  console.log(props.navigation);

  // need to get the data here because it is where we have access to the id from react router.
  // const { id } = match.params;

  // useEffect is treated as componentDidMount and componentWillUnmount
  useEffect(
    () => {
      getCommentsByDiscussionId(JSON.stringify(postId), dispatch);
    },
    () => getCommentsByDiscussionId()
  );

  return <Post />;
};
export default PostPage;

// // <NavWrapper>
// {/* </NavWrapper> */}
