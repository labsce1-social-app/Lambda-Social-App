import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Subtopic = lazy(() => import('./Subtopic'));
import { Text } from 'native-base';
import { BASE_URL, LOCAL } from 'react-native-dotenv';
import { withRouter } from 'react-router-native';

const Subtopics = props => {
  const { state } = useContext(Store);

  return state.subtopics_loading === true ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={state.subtopics}
      renderItem={({ item }) => {
        return (
          <Suspense fallback={<Text>Loading...</Text>}>
            <Subtopic
              //   changeLink={() =>
              //     history.push({
              //       pathname: `/discussions/${item.id}`,
              //       id: item.id
              //     })
              //   }
              id={item.id}
              title={item.title.split(' ').join('-')}
              name={item.username}
              date={item.date !== item.updated ? item.updated : item.date}
            />
          </Suspense>
        );
      }}
      keyExtractor={item => `${item.id}`}
      refreshing={state.subtopics_loading}
    />
  );
};

export default Subtopics;
