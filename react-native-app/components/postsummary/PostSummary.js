import React from 'react';
import { Text, View, Image } from 'react-native';
import style from './Style';
import PropTypes from 'prop-types';
import ErrorIcon from './_ionicons_svg_md-alert.svg';


const PostSummary = props => {
    return (<View style={style.viewContainer}>
        <Image style={style.icon} source={ErrorIcon} />
        <View style={style.textView}>
          <View style={style.line1}>
            <Text style={style.title}>{props.title}</Text>
            <Text> </Text>
            <Text>s/</Text>
            <Text style={style.origin}>{props.subTopic}</Text>
          </View>
          <View style={style.line2}>
            <Text style={style.name}>{props.name}</Text>
            <Text> - </Text>
            <Text style={style.date}>{props.date}</Text>
          </View>
          <View style={style.line3}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={style.comment}>{props.comment}</Text>
          </View>
        </View>
      </View>)
}

PostSummary.defaultProps = {
  icon: ErrorIcon,
  title: 'No Title Provided',
  subTopic: 'No SubTopic Provided',
  name: 'No Name Provided',
  date: 'No Date Provided',
  comment: 'No Comment Provided'
};

PostSummary.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTopic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired
}

export default PostSummary;