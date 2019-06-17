import React from 'react';
import { CardItem, Left, Thumbnail, Body, Text, Button, Icon } from 'native-base';
import { Image } from 'react-native';

import style from './Style';

const PostHeader = (props) => {
    return (
        <>
            <CardItem>
                <Body>
                    <Text note>{props.discussion_date}</Text>
                    <Thumbnail source={{ url: props.creator_avatar }} style={style.avatar} />
                    <Text>{props.creator}</Text>
                    <Image source={{ url: props.discussion_image }} style={style.post_image} />
                    <Text>{props.discussion_content}</Text>
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                        <Icon name="heart" />
                        <Text>10+</Text>
                    </Button>
                </Left>
            </CardItem>
        </>
    )
}

export default PostHeader;