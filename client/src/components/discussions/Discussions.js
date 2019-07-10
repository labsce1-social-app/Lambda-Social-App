import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { upvoteDiscussion, downvoteDiscussion } from '../../utils/Requests';
import { FlatList } from 'react-native-gesture-handler';
const Discussion = lazy(() => import('./Discussion'));
import { Text, Card, CardItem } from 'native-base';
import { isEmpty } from '../../utils/utility';
import { config } from '../../utils/dimensions';
import style from './Style';


const Discussions = ({ loading, discussions }) => {
  const { state, dispatch } = useContext(Store);

  // handles adding upvotes, sends data to context reducer
  const upvote = (discussion_id) => {
    const newUpvote = {
      user_id: state.user.id,
      discussion_id
    }
    const top = true;
    upvoteDiscussion(dispatch, newUpvote, top);
  }

  const downvote = (discussion_id) => {
    const newDownvote = {
      user_id: state.user.id,
      discussion_id
    }
    const top = true;
    downvoteDiscussion(dispatch, newDownvote, top);
  }
  return loading === true ? (
    <Text>Loading...</Text>
  ) : loading === false && !isEmpty(discussions) ? (
    <FlatList
      data={discussions}
      renderItem={({ item }) => (
        <Suspense fallback={<Text>Loading...</Text>}>
          <Discussion
            id={item.id}
            image={item.image}
            title={item.title}
            discussion={item.content}
            name={item.username}
            date={item.created_at}
            comment={item.comments}
            upvotes={item.upvotes}
            handlePressFirst={() => upvote(item.id)}
            handlePressSecond={() => downvote()}
            hashtags={item.hashtags && item.hashtags.map((hashtag, index) => (
              <Text style={style.hashtagText}
                key={`hashtag-${hashtag[0]}-${index}`}
              >{hashtag}</Text>
            ))}
          />
        </Suspense>
      )}
      keyExtractor={item => `${item.id}`}
      refreshing={loading}
    />
  ) : (
        <Card>
          <CardItem>
            <Text style={{ padding: 15, height: config.deviceHeight * 0.65 }}>
              Looks like no one has created a discussion in this subtopic yet...
        </Text>
          </CardItem>
        </Card>
      );
};

export default Discussions;
