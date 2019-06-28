import React, { useContext, useEffect, lazy, Suspense, useState } from 'react';
// import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Subtopic = lazy(() => import('./Subtopic'));
import { Text } from 'native-base';
import { BASE_URL, LOCAL } from 'react-native-dotenv';
import { withRouter } from 'react-router-native';
import { FlatList, Image, View, TouchableHighlight, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

const Subtopics = props => {
  const { state } = useContext(Store);

  return state.subtopics_loading === true ? (
    <Text>Loading...</Text>
  ) : (
    <View style={{ flex: 1, marginTop: 34 }}>
      <View
        style={{
          backgroundColor: '#BB1333',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 60
        }}
      >
        <TouchableHighlight
          style={{ marginRight: 10 }}
          underlayColor="#BB1333"
          onPress={() => props.navigation.navigate('Modal')}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/add-icon.png')}
          />
        </TouchableHighlight>
      </View>
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
    </View>
  );
};

export default withNavigation(Subtopics);
