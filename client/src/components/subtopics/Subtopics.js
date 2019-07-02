import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context';
const Subtopic = lazy(() => import('./Subtopic'));
import { Spinner } from 'native-base';
import { FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';

const Subtopics = props => {
  const { state } = useContext(Store);
  return state.subtopics_loading === true ? (
    <Spinner />
  ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={state.subtopics}
          renderItem={({ item }) => {
            return (
              <Suspense fallback={<Spinner />}>
                <Subtopic
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
      </View>
    );
};

export default withNavigation(Subtopics);
