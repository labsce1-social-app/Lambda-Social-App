import React from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Button } from 'native-base';
import style from './Style';

// Set up dummy image then redux method to get user image for post.
let icon = require('./my-icon.png');

const PostSummary = props => {
    return (<View style={style.viewContainer}>
        <Image style={style.icon} source={icon} />
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

export default PostSummary;