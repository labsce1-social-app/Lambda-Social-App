import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { Image, FlatList } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { config } from '../../utils/dimensions';
// import Comment from './Comment';
const Comment = lazy(() => import('./Comment'));
// import { getCommentsByDiscussionId } from '../../utils/Requests';

// get's discussion id from Route through match.params.id
const Post = () => {
    // bring in state and dispatch
    const { state, _ } = useContext(Store);
    const { creator, creator_avatar, discussion_content, discussion_date, discussion_image } = state.comments;

    console.log(state.comments)
    return state.comments_loading ? <Text>Loading... </Text> : (
        <Card style={{ flex: 0, minHeight: config.deviceHeight * 0.715 }}>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: `${creator_avatar}` }} />
                    <Body>
                        <Text>{creator}</Text>
                        <Text>{discussion_content}</Text>
                        <Text note>{discussion_date}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Image source={{ uri: `${discussion_image}` }} style={{ height: 200, width: 200, flex: 1 }} />
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi autem atque iusto velit quis nemo, quibusdam excepturi cum non distinctio ad nostrum quidem vel reiciendis optio
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

            {state.comments && state.comments_loading === false ? (
                <FlatList
                    data={state.comments}
                    renderItem={({ item }) => (
                        <Suspense fallback={<Text>Loading... </Text>}>

                            <Comment
                                image={item.avatar}
                                date={item.created_date}
                                name={item.username}
                                comment={item.post}
                            />
                        </Suspense>
                    )}
                    keyExtractor={(item, index) => `${index}-${item.comment_id}`}
                />
            ) : <Text>Loading...</Text>}
        </Card>
    );
}

export default Post;