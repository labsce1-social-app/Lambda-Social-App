import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, Text, View } from 'react-native';
import { Spinner } from 'native-base';
import { isEmpty } from '../../utils/utility';
import style from './Style';
import PostHeader from './PostHeader';
import CommentInput from './CommentInput';
// import ReplyInput from './ReplyInput';
const Comment = lazy(() => import('./Comment'));

// get's discussion id from Route through match.params.id
const Post = React.forwardRef((props, ref) => {
  // bring in state and dispatch
  const { state } = useContext(Store);
  const { comments, comments_loading } = state;

  return state.comments_loading ? (
    <Spinner />
  ) : (
      <ScrollView ref={ref}>
        <View style={style.container}>
          {!isEmpty(comments) && comments_loading === false ? (
            <Suspense fallback={<Spinner />}>
              <PostHeader
                id={props.postId}
                title={props.postTitle}
                creator={comments[0].creator}
                discussion_image={comments[0].discussion_image}
                discussion_content={comments[0].discussion_content}
                discussion_date={comments[0].discussion_date}
                upvotes={comments[0].upvotes}
                voted={comments[0].voted}
              />
            </Suspense>
          ) : null}

          {!isEmpty(comments) && comments_loading === false ? (
            <FlatList
              scrollEnabled={false}
              data={comments.comments}
              renderItem={({ item }) => {

                return (
                  <Suspense fallback={<Spinner />}>
                    <Comment
                      image={item.avatar}
                      date={item.created_date}
                      name={item.username}
                      comment={item.comment_post}
                      item={item.replies}
                      passCommentDetails={() => props.startReply()}
                      commentDetails={item}
                      userId={item.user_id}
                      isReplyingToComment={props.isReplyingToComment}
                      postId={props.postId}
                      hideInput={props.hideInput}
                      setIsReplying={props.setIsReplying}
                      isAuthed={state.isAuthenticated}
                      navigation={props.navigation}
                    />
                  </Suspense>
                );
              }}
              keyExtractor={(item, index) => `${index}-${item.comment_id}`}
            />
          ) : !isEmpty(comments) && comments.comments.length === 0 ? (
            <Comment
              image="../../assets/lambdaschool.png"
              date={new Date().now()}
              name="neralBot"
              comment="No one has posted yet"
            />
          ) : (
                <Text> Loading...</Text>
              )}
          {props.isReplying ? (
            <CommentInput hideInput={props.hideInput} postId={props.postId} />
          ) : null}
        </View>
      </ScrollView>
    );
});

export default Post;
