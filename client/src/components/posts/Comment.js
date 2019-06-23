import React from 'react';
import style from './Style';
import { Card, CardItem, Text, Body, Right, Thumbnail } from 'native-base';
import moment from 'moment';

const Comment = props => {
    return (
        <Card style={{ flex: 0, padding: 2 }}>
            <CardItem style={{ flex: 1, flexDirection: 'row', width: '100%', marginBottom: 0 }}>
                <Thumbnail source={{ url: props.image }} style={{ width: 40, height: 40, alignSelf: 'flex-start', marginRight: 5 }} />
                <Body style={{ flex: 1, flexDirection: 'column', marginBottom: 10, backgroundColor: '#E9E9E9', padding: 10, borderRadius: 10 }}>
                    <Text style={style.username} >{props.name}</Text>
                    <Text style={{ marginBottom: 0 }}>{props.comment}</Text>
                </Body>
            </CardItem>
            <Right style={{ flex: 1, flexDirection: 'row', textAlign: 'right', alignSelf: 'flex-end', paddingRight: 15, marginBottom: 10 }}>
                <Text style={{ color: '#606770', fontWeight: 'bold', fontSize: 14 }}>{moment(props.date).fromNow()}</Text>
                <Text style={{ marginLeft: 10, color: '#606770', fontWeight: 'bold', fontSize: 14 }}>Reply</Text>
            </Right>
        </Card >
    )
}

export default Comment;