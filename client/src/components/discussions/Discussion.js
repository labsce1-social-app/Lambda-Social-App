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
        <Body style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Left>
            <View style={{ width: !isEmpty(props.image) ? '15%' : null }}>
              {!isEmpty(props.image)
                && (
                  <Image
                    // style={style.avatar}
                    style={{ width: 100, height: 165 }}
                    source={props.image.includes('http://') && !isEmpty(props.image) ? require('../../NeralSplash.png') : { uri: props.image }} />
                )}
            </View>
          </Left>
          <View style={{ width: !isEmpty(props.image) ? '75%' : '100%' }}>
            <CardItem style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>

              <Text style={style.title}>{props.title}</Text>
              <Text
                numberOfLines={1}
                style={{ marginBottom: 10, fontSize: 18 }}
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

              <View style={style.stats}>
                <Reaction
                  image={require('../../assets/comments.png')}
                  count={props.comment}
                />
                <Text style={{ marginRight: 10 }}>{'  '}</Text>
                <Reaction
                  image={require('../../assets/up.png')}
                  count={props.upvotes}
                  voted={props.voted}
                  colorTint="green"
                />
                <Reaction
                  image={require('../../assets/down.png')}
                  voted={props.voted}
                  colorTint="orange"
                />
              </View>
            </CardItem>
          </View>
        </Body>
      </CardItem>
      <CardItem style={style.hashtags}>{props.hashtags}</CardItem>
    </Card>
  );
};

export default withNavigation(Discussion);
