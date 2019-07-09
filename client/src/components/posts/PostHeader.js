import React from 'react';
import { CardItem, Thumbnail, Body, Text } from 'native-base';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import Reaction from '../../common/Reaction';
import style from './Style';
import { config } from '../../utils/dimensions';
import moment from 'moment';

const ImagePost = props => {
  if (!props.discussion_image) {
    return null;
  } else {
    const imageUrl = props.discussion_image.replace('http://', 'https://');
    return <Image source={{ url: props.discussion_image }} />;
  }
};

const PostHeader = props => {
  return (
    <>
      <CardItem
        style={{
          maxHeight: config.deviceHeight * 0.35,
          minHeight: config.deviceHeight * 0.35,
          overflow: 'scroll'
        }}
      >
        <Body>
          <Text style={style.title}>{props.title}</Text>
          <Text note>
            {moment(props.discussion_date).format('DD MMM YY hh:mm am')}
          </Text>
          <Thumbnail
            source={{ url: props.creator_avatar }}
            style={style.avatar}
          />
          <Text>{props.creator}</Text>

          <ImagePost style={style.post_image} />

          <Text>{props.discussion_content}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: 20,
            height: 40,
            padding: 10
          }}
        >
          <Reaction
            count={props.upvotes}
            image={require('../../assets/like.png')}
          />
        </View>
      </CardItem>
    </>
  );
};

export default PostHeader;
