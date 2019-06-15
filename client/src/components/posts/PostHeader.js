import React from 'react';
import { CardItem, Left, Thumbnail, Body, Text, Button } from 'native-base';
import { style } from './Style';

const PostHeader = (props) => {
    return (
        <>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: props.creator_avatar }} style={style.avatar} />
                    <Body>
                        <Text>{props.creator}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Image source={{ uri: `${props.discussion_image}` }} style={style.post_image} />
                    <Text>{props.discussion_content}</Text>
                    <Text note>{props.discussion_date}</Text>
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