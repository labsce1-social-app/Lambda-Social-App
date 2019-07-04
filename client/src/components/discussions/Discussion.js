import React from 'react';
import { Image } from 'react-native';
import style from './Style';
import { Card, CardItem, Text, Body, Left, View } from 'native-base';
import moment from 'moment';
import Reaction from '../../common/Reaction';
import { isEmpty } from '../../utils/utility';
import { withNavigation } from 'react-navigation';

const Discussion = props => {
  return (
    <Card
      style={{
        flex: 0,
        marginBottom: 20
      }}
    >
      <CardItem
        button
        onPress={() =>
          props.navigation.navigate('Post', {
            postId: props.id,
            title: props.title
          })
        }
      >
        <Left>
          <Body>
            <Text style={style.title}>s/{props.title}</Text>
            <Text
              numberOfLines={1}
              style={{ marginBottom: 10, fontSize: 20, marginLeft: 3 }}
            >
              {props.discussion}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'flex-start'
              }}
            >
              <Text style={style.username}>{props.name} &#8226; </Text>
              <Text style={style.date}>{moment(props.date).fromNow()}</Text>
            </View>
            {!isEmpty(props.image) && props.image.includes('https://') && (
              <Image style={style.avatar} source={{ url: props.image }} />
            )}
            <View style={style.stats}>
              <Reaction
                image={require('../../assets/comments.png')}
                count={props.comment}
              />
              <Text>{'  '}</Text>
              <Reaction
                image={require('../../assets/like.png')}
                count={props.upvotes}
              />
            </View>
          </Body>
        </Left>
      </CardItem>
      <CardItem style={style.hashtags}>{props.hashtags}</CardItem>
    </Card>
  );
};

export default withNavigation(Discussion);
