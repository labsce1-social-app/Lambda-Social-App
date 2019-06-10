import React from 'react';
import style from './Style';
import { Card, CardItem, Text, Body, Left, Thumbnail } from 'native-base';
import moment from 'moment'

const Comment = props => {
    return (
        <Card style={{ flex: 0 }}>
            <CardItem>
                <Left>
                    <Thumbnail style={style.icon} source={{ url: props.image }} />
                    <Body>
                        <Text style={style.date}>{moment(props.date).fromNow()}</Text>
                        <Text style={style.username}>{props.name}</Text>
                        <Text numberOfLines={1}>{props.comment}</Text>
                        <Text style={style.buttons}> Reply</Text>
                    </Body>
                </Left>
            </CardItem>
        </Card >
    )
}

Comment.defaultProps = {
    icon: 'No Icon Provided',
    title: 'No Title Provided',
    subTopic: 'No SubTopic Provided',
    name: 'No Name Provided',
    date: 'No Date Provided',
    comment: 'No Comment Provided'
};

export default Comment;