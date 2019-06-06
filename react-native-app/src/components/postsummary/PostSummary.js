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
              <Text>{props.title}</Text>
              <Text >{props.name}</Text>
              <Text >{props.date}</Text>

              <Text numberOfLines={1} ellipsizeMode='tail' style={style.comment}><Icon name="contacts" /> {props.comment}</Text>
            </Body>
          </Left>
          {/* <Body>
            <Text>{props.subTopic}</Text>
          </Body> */}

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