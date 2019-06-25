import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Subtopic = lazy(() => import('./Subtopic'));
import { Text } from 'native-base';
import { BASE_URL, LOCAL } from 'react-native-dotenv';
import { withRouter } from 'react-router-native';

const Subtopics = ({ history }) => {
  const { state, dispatch } = useContext(Store);
  useEffect(
    () => {
      getSubtopics();
    },
    () => getSubtopics()
  );

  const getSubtopics = async () => {
    // const url = 'http://localhost:3000'
    dispatch({ type: 'SUBTOPICS_FETCHING' });
    try {
      const response = await fetch(`${BASE_URL}/subtopics`);
      const resJson = await response.json();
      dispatch({ type: 'SUBTOPICS_FETCHED', payload: resJson });
    } catch (error) {
      dispatch({ type: 'SUBTOPICS_FAILED', payload: error });
      throw new Error(error);
    }
    return (
        state.subtopics_loading === true ? <Text>Loading...</Text> : (
            <FlatList
                data={state.subtopics}
                renderItem={({ item }) => {
                    return (
                        <Suspense fallback={<Text>Loading...</Text>}>
                            <Subtopic
                                changeLink={() => history.push({
                                    pathname: `/discussions/${item.id}`,
                                    id: item.id
                                })
                                }
                                id={item.id}
                                title={item.title.split(' ').join('-')}
                                name={item.username}
                                date={item.date !== item.updated ? item.updated : item.date}
                            />
                        </Suspense>
                    )
                }}
                keyExtractor={(item) => `${item.id}`}
                refreshing={state.subtopics_loading}

            />
          </Suspense>
        );
      }}
      keyExtractor={item => `${item.id}`}
      refreshing={state.subtopics_loading}
    />
  );
};

export default withRouter(Subtopics);
