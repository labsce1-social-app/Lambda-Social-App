import React from 'react';
import style from './Style';
import { CardItem, Text, Body, Right, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import moment from 'moment';

const Reply = ({ image, comment, name, date }) => {
    return (
        <View style={style.reply_container}>
            <CardItem style={style.reply_card}>
                <Thumbnail source={{ url: image }} style={style.reply_avatar} />
                <Body style={style.reply_body}>
                    <Text style={style.username} >{name}</Text>
                    <Text style={{ marginBottom: 0 }}>{comment}</Text>
                </Body>
            </CardItem>
            <Right style={style.reply_buttons_container}>
                <Text style={style.reply_date}>{moment(date).fromNow()}</Text>
                <TouchableOpacity>
                    <Text style={style.reply_reply_button}>Reply</Text>
                </TouchableOpacity>
            </Right>
        </View >
    )
}

export default Reply;