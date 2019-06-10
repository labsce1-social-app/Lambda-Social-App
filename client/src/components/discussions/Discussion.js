import React from 'react';
import { Image } from 'react-native';
import style from './Style';
import { Content, Card, CardItem, Text, Body, Left, Icon } from 'native-base';
import moment from 'moment'



const Discussion = props => {
    return (
        <Content>
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Image style={style.icon} source={{ url: props.image }} />
                        <Body>
                            <Text style={style.date}>{moment(props.date).fromNow()}</Text>
                            <Text style={style.title}>s/{props.title}</Text>
                            <Text style={style.username}>{props.name}</Text>
                            <Text numberOfLines={1}>{props.discussion}</Text>
                            <Text style={style.comment}><Icon name="chatbubbles" /> {props.comment} {' '}
                                < Icon
                                    name="heart-empty" style={style.chat} /> {props.comment}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card >
        </Content >
    )
}

Discussion.defaultProps = {
    icon: 'No Icon Provided',
    title: 'No Title Provided',
    subTopic: 'No SubTopic Provided',
    name: 'No Name Provided',
    date: 'No Date Provided',
    comment: 'No Comment Provided'
};

export default Discussion;