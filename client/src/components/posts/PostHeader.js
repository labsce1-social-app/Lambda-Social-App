import React from 'react';
import { CardItem, Thumbnail, Body, Text } from 'native-base';
import { Image, View } from 'react-native';
import Reaction from '../../common/Reaction';
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
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    justifyContent: 'space-between', flexDirection: 'column',
                    width: 20,
                    height: 40,
                    padding: 10
                }}>

                    {/* <Icon name="heart" /> */}
                    <Reaction count={props.upvotes} image={require('../../assets/like.png')} />
                    {/* <Text>{props.upvotes}</Text> */}
                </View>
            </CardItem>
        </>
    )
}

export default PostHeader;