import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import Post from '../components/posts/Post';
import FabButton from '../components/posts/FabButton';
import { getCommentsByDiscussionId } from '../context/actions/commentActions';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';
import { theme } from '../common/theme';

const PostPage = props => {
  // get ref to scrollview to automatically scroll to the bottom
  // of comments
  let scrollView = React.createRef();

  // handle life cycle for comments
  const { state, dispatch } = useContext(Store);
  const [isReplying, setIsReplying] = useState(false);
  const [isReplyingToComment, setIsReplyingToComment] = useState(false);
  const postId = props.navigation.getParam('postId', 'None');
  const postTitle = props.navigation.getParam('title');

  // need to get the data here because it is where we have access to the id from react router.

  // useEffect is treated as componentDidMount and componentWillUnmount
  useEffect(
    () => {
      let user_id;
      if (state.user) {
        user_id = state.user.id;
      } else {
        user_id = 'null';
      }
      getCommentsByDiscussionId(
        JSON.stringify(postId),
        dispatch,
        user_id
      );
    },
    () => getCommentsByDiscussionId()
  );

  const closeInputs = () => {
    setIsReplying(false);
  };

  return (
    <Container
      style={{
        backgroundColor: Platform.OS === 'ios' ? theme.colors.white : theme.colors.offWhite,
        padding: 5
      }}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={10}
        enableOnAndroid={true}>
        <Post
          postTitle={postTitle}
          isReplying={isReplying}
          ref={scrollView}
          startReply={() => setIsReplyingToComment(!isReplyingToComment)}
          hideInput={() => closeInputs()}
          postId={JSON.stringify(postId)}
        />
      </KeyboardAwareScrollView>
      {state.isAuthenticated ? (
        <FabButton
          isreplying={isReplying}
          replyToComment={() => {
            scrollView.current.scrollToEnd({ animated: true });
            setIsReplying(!isReplying);
          }}
          postId={JSON.stringify(postId)}
        />
      ) : null}
    </Container>
  );
  // return <Thread />
};
export default withNavigation(PostPage);
