import React from 'react';
import style from './Style';
import { Card, CardItem, Text, Body, Left, Right, Thumbnail } from 'native-base';
import { View } from 'react-native';
import moment from 'moment'
import IconButton from '../../common/IconButton';

const Comment = props => {
    return (
        <Card style={{ flex: 0 }}>
            <CardItem style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                <Left style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start', marginBottom: 10 }}>
                    <Thumbnail source={{ url: props.image }} />
                    <View>
                        <Text style={style.date}>{moment(props.date).fromNow()}</Text>
                        <Text style={style.username} >{props.name}</Text>
                    </View>
                </Left>
                <Body>
                    <Text style={{ marginBottom: 40 }}>{props.comment}</Text>
                    <Right>
                        <IconButton primary iconLeft block name="paper-plane">Reply</IconButton>
                    </Right>
                </Body>
            </CardItem>
        </Card >
    )
}

export default Comment;