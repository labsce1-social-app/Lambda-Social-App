import React from 'react';
import style from './Style';
import { CardItem, Text, Body, Right, Thumbnail } from 'native-base';
import { View } from 'react-native';
import moment from 'moment';

const Reply = ({ image, comment, name, date }) => {
    return (
        <View style={{ flex: 0, padding: 2, marginLeft: 40 }}>
            <CardItem style={{ flex: 1, flexDirection: 'row', width: '100%', marginBottom: 0 }}>
                <Thumbnail source={{ url: image }} style={{ width: 40, height: 40, alignSelf: 'flex-start', marginRight: 5 }} />
                <Body style={{ flex: 1, flexDirection: 'column', marginBottom: 10, backgroundColor: '#E9E9E9', padding: 10, borderRadius: 10 }}>
                    <Text style={style.username} >{name}</Text>
                    <Text style={{ marginBottom: 0 }}>{comment}</Text>
                </Body>
            </CardItem>
            <Right style={{ flex: 1, flexDirection: 'row', textAlign: 'right', alignSelf: 'flex-end', paddingRight: 15, marginBottom: 10 }}>
                <Text style={{ color: '#606770', fontWeight: 'bold', fontSize: 14 }}>{moment(date).fromNow()}</Text>
                <Text style={{ marginLeft: 10, color: '#606770', fontWeight: 'bold', fontSize: 14 }}>Reply</Text>
            </Right>
        </View >
    )
}

export default Reply;