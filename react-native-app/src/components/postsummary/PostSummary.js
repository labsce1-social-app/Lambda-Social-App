import React from 'react';
import { View, Image } from 'react-native';
import style from './Style';
import PropTypes from 'prop-types';
import { Content, Card, CardItem, Text, Body, Left, Icon } from 'native-base';
import moment from 'moment'



const PostSummary = props => {
  return (
    <Content>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Image style={style.icon} source={{ url: props.image }} />
            <Body>
              <Text style={style.date}>{moment(props.date).fromNow()}</Text>
              <Text style={style.title}>s/{props.title}</Text>
              <Text style={style.username}>{props.name}</Text>
              <Text numberOfLines={1}>{props.discussion}</Text>
              <Text style={style.comment}><Icon name="chatbubbles" /> {props.comment} {' '}
                < Icon
                  name="heart-empty" style={style.chat} /> {props.comment}</Text>
            </Body>
          </Left>

        </CardItem>
      </Card >
    </Content >
  )
}

PostSummary.defaultProps = {
  icon: 'No Icon Provided',
  title: 'No Title Provided',
  subTopic: 'No SubTopic Provided',
  name: 'No Name Provided',
  date: 'No Date Provided',
  comment: 'No Comment Provided'
};

// PostSummary.propTypes = {
//   icon: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   subTopic: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   comment: PropTypes.string.isRequired
// }

export default PostSummary;