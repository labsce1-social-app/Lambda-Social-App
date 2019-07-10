import React from 'react';
import {
  CardItem,
  Card,
  Thumbnail,
  Body,
  Text,
  Container,
  Content
} from 'native-base';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import Reaction from '../../common/Reaction';
import style from './Style';
import { config } from '../../utils/dimensions';
import moment from 'moment';

const PostHeader = props => {
  console.log(props.creator_avatar);

  return (
    <CardItem>
      <Content>
        <View
          style={
            {
              // maxHeight: config.deviceHeight * 0.35,
              // minHeight: config.deviceHeight * 0.35
              // overflow: 'scroll'
              // marginBottom: 5
            }
          }
        >
          <View style={style.top}>
            <Text style={style.heading}>{props.creator}</Text>
            <Text note style={style.heading}>
              {moment(props.discussion_date).format('DD MMM YY hh:mm am')}
            </Text>
          </View>

          <Text style={style.title}>{props.title}</Text>

          <Thumbnail
            source={{ uri: props.creator_avatar }}
            style={props.creator_avatar ? style.avatar : { height: 0 }}
          />
          <Text style={{ marginBottom: 10 }}>{props.discussion_content}</Text>

          <Image
            style={style.post_image}
            source={{ uri: props.discussion_image }}
          />
        </View>

        <View
          style={{
            // flex: 1,
            alignItems: 'flex-start',
            // backgroundColor: 'grey',
            width: '100%'
          }}
        >
          <View style={{ width: 50 }}>
            <Reaction
              count={props.upvotes}
              image={require('../../assets/like.png')}
            />
          </View>
        </View>
      </Content>
    </CardItem>
  );
};

export default PostHeader;
