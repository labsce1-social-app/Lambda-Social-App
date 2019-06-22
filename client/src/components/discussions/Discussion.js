import React from 'react';
import { Image, Button } from 'react-native';
import { withRouter } from 'react-router-native';
import style from './Style';
import { Card, CardItem, Text, Body, Left, Icon, View } from 'native-base';
import moment from 'moment'
import Reaction from '../reactions/Reaction';



const Discussion = props => {
    return (
        <Card style={{ flex: 0 }} >
            <CardItem button onPress={props.changeLink}>
                <Left>
                    <Image style={style.avatar} source={{ url: props.image.replace('http://', 'https://') }} />
                    <Body>
                        <Text style={style.date}>{moment(props.date).fromNow()}</Text>
                        <Text style={style.title}>s/{props.title}</Text>
                        <Text style={style.username}>{props.name}</Text>
                        <Text numberOfLines={1}>{props.discussion}</Text>
                        <View style={style.stats}>
                            <Text style={style.comment}>
                                <Icon name="chatbubbles" style={[style.icon, style.bubble]} /> {props.comment} {' '}
                            </Text>
                            <Reaction image={require('../../assets/upvote-512.png')} count={props.upvotes} />
                        </View>
                    </Body>
                </Left>
            </CardItem>
        </Card >
    )
}

export default withRouter(Discussion);