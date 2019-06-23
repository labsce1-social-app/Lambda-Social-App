import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
import { Text } from 'native-base';
import { BASE_URL } from 'react-native-dotenv';
import { isEmpty } from '../../utils/isEmpty';

const Discussions = ({ history }) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    const abortController = new AbortController();
    getDiscussions();
    return function cleanup() {
      abortController.abort();
    }
  }, []);
  console.log(state.discussions)
  const getDiscussions = async () => {
    const url = 'http://localhost:3000'
    try {
      dispatch({ type: 'DISCUSSIONS_FETCHING' });
      const response = await fetch(`${url}/discussions/s/${history.location.state.id}`);
      const resJson = await response.json();
      return dispatch({ type: 'DISCUSSIONS_FETCHED', payload: resJson });
    } catch (error) {
      dispatch({ type: 'DISCUSSIONS_FAILED', payload: error });
      console.log(error);
    }
  };


  return state.discussions_loading === true ? (
    <Text>Loading...</Text>
  ) : state.discussions_loading === false && !isEmpty(state.discussions) ? (
    <FlatList
      data={state.discussions}
      renderItem={({ item }) => (
        <Suspense fallback={<Text>Loading...</Text>}>
          <Text>Discussions By Subtopic</Text>
          <Discussion
            changeLink={() => history.push(`/post/${item.id}`)}
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
  ) : <Text style={{ height: '60%' }}>Looks like no one has created a discussion in this subtopic yet...</Text>
};

export default Discussions;
