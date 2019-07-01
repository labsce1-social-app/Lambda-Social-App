import React from 'react';
import style from './Style';
import { CardItem, Text, Body, Right, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image } from 'react-native';
import moment from 'moment';

const Reply = ({ item }) => {
    return (
        <View style={style.reply_container}>
            <CardItem style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                <Body style={{ flex: 1, flexDirection: 'column', padding: 3, borderRadius: 10 }}>
                    <Text style={{ color: '#606770', fontWeight: 'bold', fontSize: 14 }}>{item.reply_commenter} {moment(item.reply_created_date).fromNow()}</Text>
                    <Text>{item.reply_post}</Text>
                    <Right style={{ width: '98%', borderColors: '#E9E9E9', borderLeftWidth: 0.5, paddingLeft: 1, lineHeight: 30 }}>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', textAlign: 'right', alignSelf: 'flex-end', paddingRight: 15 }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/reply.png')} />
                            <Text style={{ marginLeft: 10, color: '#606770', fontWeight: 'bold', fontSize: 14 }}>Reply</Text>
                        </TouchableOpacity>
                    </Right>
                </Body>
            </CardItem>
        </View >
    )
}

export default Reply;