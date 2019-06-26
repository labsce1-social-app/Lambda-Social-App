import React, { useContext, lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-native';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
import { Text } from 'native-base';

import { getDiscussions, isAuthed } from '../../utils/Requests';

const TopDiscussions = ({ history }) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    getDiscussions(state.sortBy, dispatch);
  }, []);

  //   console.log('logging inside top discussions', state.top_discussions);

  return state.top_discussions_loading === true ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={state.top_discussions}
      renderItem={({ item }) => {
        return (
          <Suspense fallback={<Text>Loading...</Text>}>
            <Discussion
              // changeLink={() => history.push(`/post/${item.id}`)}
              image={item.image}
              title={item.title.split(' ').join('-')}
              discussion={item.content}
              name={item.username}
              date={item.created_at}
              comment={item.comments}
              upvotes={item.upvotes}
            />
          </Suspense>
        );
      }}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      refreshing={state.top_discussions_loading}
    />
  );
};

export default withRouter(TopDiscussions);
