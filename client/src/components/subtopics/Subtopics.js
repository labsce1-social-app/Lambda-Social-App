import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context';
const Subtopic = lazy(() => import('./Subtopic'));

import { Text } from 'native-base';
import { FlatList, Image, View, TouchableHighlight, Toast } from 'react-native';
import { withNavigation } from 'react-navigation';

const Subtopics = props => {
  const { state } = useContext(Store);
  return state.subtopics_loading === true ? (
    <Text>Loading...</Text>
  ) : (
      <View style={{ flex: 1, marginTop: 34 }}>
        <FlatList
          data={state.subtopics}
          renderItem={({ item }) => {
            return (
              <Suspense fallback={<Text>Loading...</Text>}>
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
