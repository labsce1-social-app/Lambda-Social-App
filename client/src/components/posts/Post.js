import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { FlatList, Text, View } from 'react-native';
import { Card, Spinner, Container } from 'native-base';
import PostHeader from './PostHeader';
import style from './Style';
const Comment = lazy(() => import('./Comment'));
import { isEmpty } from '../../utils/utility';
import { ScrollView } from 'react-native-gesture-handler';

// get's discussion id from Route through match.params.id
const Post = props => {
  // bring in state and dispatch
  const { state } = useContext(Store);
  const { comments, comments_loading } = state;
  console.log(comments);
  return state.comments_loading ? (
    <Text style={style.container}>Loading... </Text>
  ) : (
    <ScrollView>
      <View style={style.container}>
        {!isEmpty(comments) && comments_loading === false ? (
          <Suspense fallback={<Spinner />}>
            <PostHeader
              // creator_avatar={}
              title={props.postTitle}
              creator={comments[0].creator}
              discussion_image={comments[0].discussion_image}
              discussion_content={comments[0].discussion_content}
              discussion_date={comments[0].discussion_date}
              upvotes={comments[0].upvotes}
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
                    comment={item.post}
                    item={item.replies}
                    id={item.replies.id}
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
            name="LambdaBot"
            comment="No one has posted yet"
          />
        ) : (
          <Text> Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Post;
