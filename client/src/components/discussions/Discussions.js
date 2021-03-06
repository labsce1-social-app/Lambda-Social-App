import React, { lazy, Suspense } from 'react';
import { View } from 'react-native';

import { withNavigation } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
const Discussion = lazy(() => import('./Discussion'));
import { Text, Card, CardItem } from 'native-base';
import { isEmpty } from '../../utils/utility';
import { config } from '../../utils/dimensions';
import style from './Style';

const Discussions = props => {
  return props.loading === true ? (
    <Text>Loading...</Text>
  ) : props.loading === false && !isEmpty(props.discussions) ? (
    <FlatList
      data={props.discussions}
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
            voted={item.voted}
            hashtags={
              item.hashtags &&
              item.hashtags.map((hashtag, index) => (
                <Text
                  onPress={() =>
                    props.navigation.navigate('DiscussionsByHashtags', {
                      hashtag: hashtag.hashtag,
                      title: hashtag.hashtag
                    })
                  }
                  style={style.hashtagText}
                  key={`hashtag-${hashtag.hashtag}-${index}`}
                >
                  {hashtag.hashtag}
                </Text>
              ))
            }
          />
        </Suspense>
      )}
      keyExtractor={item => `${item.id}`}
      refreshing={props.loading}
    />
  ) : (
        <View>
          <Text style={{ padding: 15, height: config.deviceHeight * 0.65 }}>
            Looks like no one has created a discussion in this subtopic yet...
      </Text>
        </View>
      );
};

export default withNavigation(Discussions);
