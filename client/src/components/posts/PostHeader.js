import React from 'react';
import { CardItem, Thumbnail, Body, Text } from 'native-base';
import { Image, View, ScrollView } from 'react-native';
import Reaction from '../../common/Reaction';
import style from './Style';
import { config } from '../../utils/dimensions';
import moment from 'moment';

const PostHeader = (props) => {
    return (
        <>
            <CardItem style={{ maxHeight: config.deviceHeight * 0.35, minHeight: config.deviceHeight * 0.35, overflow: 'scroll' }}>
                <ScrollView>
                    <Body>
                        <Text note>{moment(props.discussion_date).format('DD MMM YY hh:mm am')}</Text>
                        <Thumbnail source={{ url: props.creator_avatar }} style={style.avatar} />
                        <Text>{props.creator}</Text>
                        <Image source={{ url: props.discussion_image }} style={style.post_image} />
                        <Text>{props.discussion_content}</Text>
                    </Body>
                </ScrollView>
            </CardItem>
            <CardItem>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    width: 20,
                    height: 40,
                    padding: 10
                }}>

                    <Reaction count={props.upvotes} image={require('../../assets/like.png')} />
                </View>
            </CardItem>
        </>
    )
}

export default PostHeader;