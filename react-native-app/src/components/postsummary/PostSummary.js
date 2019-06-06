import React from 'react';
import { View, Image } from 'react-native';
import style from './Style';
import PropTypes from 'prop-types';
import { Content, Card, CardItem, Text, Body, Left, Right, Thumbnail, Icon } from 'native-base';



const PostSummary = props => {
  return (
    <Content>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail style={style.icon} source={{ url: props.image }} />
            <Body>
              <Text style={style.date}>{props.date}</Text>
              <Text style={style.title}>{props.title}</Text>
              <Text >{props.name}</Text>
              <Body>
                <Text numberOfLines={1}>{props.subTopic}</Text>
              </Body>
              <Text style={style.comment}><Icon name="chatbubbles" /> {props.comment}</Text>
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