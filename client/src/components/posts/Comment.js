import React from 'react';
import { CardItem, Text, Body, Right } from 'native-base';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Reply from './Reply.js';
import { isEmpty } from '../../utils/utility'

const Comment = ({ image, comment, name, date, item }) => {
    return (
        <View style={{ flex: 0, padding: 2 }}>
            <CardItem style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                <Body style={{ flex: 1, flexDirection: 'column', borderColors: '#E9E9E9', borderLeftWidth: 0.5, lineHeight: 30, paddingLeft: 20, marginLeft: 3 }}>
                    <Text style={{ color: '#606770', fontWeight: 'bold', fontSize: 14 }}>{name} {moment(date).fromNow()}</Text>
                    <Text>{comment}</Text>
                    <Right style={{ width: '98%' }}>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', textAlign: 'right', alignSelf: 'flex-end', paddingRight: 15 }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/reply.png')} />
                            <Text style={{ marginLeft: 10, color: '#606770', fontWeight: 'bold', fontSize: 14 }}>Reply</Text>
                        </TouchableOpacity>
                    </Right>
                </Body>
            </CardItem>
            {!isEmpty(item.reply_post) ?
                <Reply
                    item={item} />
                : null}
        </View >
    )
}

export default Comment;