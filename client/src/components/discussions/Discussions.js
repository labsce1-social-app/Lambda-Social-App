import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
const Discussion = lazy(() => import('./Discussion'));
import { Text, Card, CardItem, Badge } from 'native-base';
import { isEmpty } from '../../utils/utility';
import { config } from '../../utils/dimensions';
import style from './Style';


const Discussions = ({ loading, discussions }) => {
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
