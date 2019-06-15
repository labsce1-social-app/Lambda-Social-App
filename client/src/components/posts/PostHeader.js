import React from 'react';
import { CardItem, Left, Thumbnail, Body, Text, Button, Icon } from 'native-base';
import { Image } from 'react-native';

import style from './Style';

const PostHeader = (props) => {
    return (
        <>
            <CardItem>
                <Left style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
                    <Text note>{props.discussion_date}</Text>
                    <Thumbnail source={{ url: props.creator_avatar }} style={style.avatar} />
                    <Body>
                        <Text>{props.creator}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
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