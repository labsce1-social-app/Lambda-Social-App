import React from 'react';
import { Image, Platform } from 'react-native';
import style from './Style';
import { Content, Card, CardItem, Text, Body, Left, Icon } from 'native-base';
import moment from 'moment'



const Discussion = props => {
    return (
        <Content>
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Image style={style.avatar} source={{ url: props.image.replace('http://', 'https://') }} />
                        <Body>
                            <Text style={style.date}>{moment(props.date).fromNow()}</Text>
                            <Text style={style.title}>s/{props.title}</Text>
                            <Text style={style.username}>{props.name}</Text>
                            <Text numberOfLines={1}>{props.discussion}</Text>
                            <Text style={style.comment}>
                                <Icon name="chatbubbles" style={[style.icon, style.bubble]} /> {props.comment} {' '}
                                <Icon
                                    name="heart" style={[style.chat, style.icon, style.heart]} /> {props.upvotes}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card >
        </Content >
    )
}

export default Discussion;