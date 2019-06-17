import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { FlatList, Text } from 'react-native';
import { Card } from 'native-base';
import PostHeader from './PostHeader';
import style from './Style';
const Comment = lazy(() => import('./Comment'));

// get's discussion id from Route through match.params.id
const Post = () => {
    // bring in state and dispatch
    const { state, dispatch } = useContext(Store);
    const { comments, comments_loading } = state;

    return state.comments_loading ? <Text style={style.container}>Loading... </Text> : (
        <Card style={style.container}>
            {comments && comments_loading === false ? (
                <Suspense fallback={<Text>Loading... </Text>}>
                    <PostHeader
                        // creator_avatar={}
                        creator={comments.creator[0].creator}
                        discussion_image={comments.creator[0].discussion_image}
                        discussion_content={comments.creator[0].discussion_content}
                        discussion_date={comments.creator[0].discussion_date}
                    />
                </Suspense>
            ) : null}
            <Text>Comments</Text>

            {comments && comments_loading === false ? (
                <FlatList
                    data={comments.comments}
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