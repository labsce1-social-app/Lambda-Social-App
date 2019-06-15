import React, { useContext, useEffect } from 'react';
import { Store } from '../../context/';
import { Image, ScrollView, FlatList } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { config } from '../../utils/dimensions';
import Comment from './Comment';
import { getCommentsByDiscussionId } from '../../utils/Requests';

// get's discussion id from Route through match.params.id
const Post = ({ match }) => {
    // bring in state and dispatch
    const { state, dispatch } = useContext(Store);
    const { id } = match.params;
    console.log(id)

    // handle life cycle for comments
    useEffect(() => {
        getCommentsByDiscussionId(id, dispatch)
    }, getCommentsByDiscussionId(id, dispatch));

    return (
        <Card style={{ flex: 0, height: config.deviceHeight * 0.715 }}>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: 'Image URL' }} />
                    <Body>
                        <Text>Luis Diaz</Text>
                        <Text>my-dog-is-awesome</Text>
                        <Text note>April 15, 2016</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: 200, flex: 1 }} />
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi autem atque iusto velit quis nemo, quibusdam excepturi cum non distinctio ad nostrum quidem vel reiciendis optio vitae quos, natus rem et quas eum. Molestias corrupti natus quia. Voluptate fugit sapiente architecto, vel ratione culpa neque quis maiores doloremque. Eveniet hic at dolor, voluptates placeat iusto ratione beatae quis. Quisquam, fugiat!
                    </Text>
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
            <Text>Comments</Text>
            <ScrollView>
                <FlatList
                    data={state.comments}
                    renderItem={({ item }) => {
                        <Comment
                            image={item.avatar}
                            date={item.created_date}
                            name={item.username}
                            comment={item.post}
                        />
                    }}
                    keyExtractor={(item, index) => `${item}-${item.comment_id}`}
                />
            </ScrollView>
        </Card>
    );
}

export default Post;