import React from 'react';
import { Image } from 'react-native';
import style from './Style';
import { Card, CardItem, Text, Body, Left, Icon, View } from 'native-base';
import moment from 'moment';
import Reaction from '../../common/Reaction';

import { withNavigation } from 'react-navigation';

const Discussion = props => {
    return (
        <Card
            style={{
                flex: 0
            }}
        >
            <CardItem
                button
                onPress={() => props.navigation.navigate('Post', { postId: props.id })}
            >
                <Left>
                    <Image
                        style={style.avatar}
                        source={{ url: props.image.replace('http://', 'https://') }}
                    />
                    <Body>
                        <Text style={style.date}>{moment(props.date).fromNow()}</Text>
                        <Text style={style.title}>s/{props.title}</Text>
                        <Text style={style.username}>{props.name}</Text>
                        <Text numberOfLines={1}>{props.discussion}</Text>
                        <View style={style.stats}>
                            <Reaction
                                image={require('../../assets/comments.png')}
                                count={props.comment}
                            />
                            <Reaction
                                image={require('../../assets/like.png')}
                                count={props.upvotes}
                            />
                        </View>
                    </Body>
                </Left>
            </CardItem>
            <CardItem style={style.hashtags}>{props.hashtags}</CardItem>
        </Card>
    );
};

export default withNavigation(Discussion);
