import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
import { Text, Card, CardItem } from 'native-base';
import { isEmpty } from '../../utils/isEmpty';
import { config } from '../../utils/dimensions';
import { getDiscussionsForSub } from '../../utils/Requests';

const Discussions = ({ history }) => {
  const { state, dispatch } = useContext(Store);
  const { id } = history.location;

  // aborController is a clean up function for fetch
  useEffect(() => {
    getDiscussionsForSub(id, dispatch);
  }, []);

  return state.discussions_loading === true ? (
    <Text>Loading...</Text>
  ) : state.discussions_loading === false && !isEmpty(state.discussions) ? (
    <FlatList
      data={state.discussions}
      renderItem={({ item }) => (
        <Suspense fallback={<Text>Loading...</Text>}>
          <Text>Discussions By Subtopic</Text>
          <Discussion
            // changeLink={() => history.push(`/post/${item.id}`)}
            id={item.id}
            image={item.image}
            title={item.title}
            discussion={item.content}
            name={item.username}
            date={item.created_at}
            comment={item.comments}
            upvotes={item.upvotes}
          />
        </Suspense>
      )}
      keyExtractor={item => `${item.id}`}
      refreshing={state.discussions_loading}
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
