import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { FlatList } from 'react-native';
import { Card } from 'native-base';
import PostHeader from './PostHeader';
import { style } from './Style';
const Comment = lazy(() => import('./Comment'));

// get's discussion id from Route through match.params.id
const Post = () => {
    // bring in state and dispatch
    const { state, _ } = useContext(Store);
    console.log(state.comments.creator)

    return state.comments_loading ? <Text style={style.container}>Loading... </Text> : (
        <Card style={style.container}>
            {state.comments && state.comments_loading === false ? (
                <Suspense fallback={<Text>Loading... </Text>}>
                    <PostHeader
                        // creator_avatar={}
                        creator={Object.keys(state.comments.creator)}
                        discussion_image={Object.keys(state.comments.discussion_image)}
                        discussion_content={Object.keys(state.comments.discussion_content)}
                        discussion_date={Object.keys(state.comments.discussion_date)}
                    />
                </Suspense>
            ) : <Text>Loading... </Text>}
            <Text>Comments</Text>

            {state.comments && state.comments_loading === false ? (
                <FlatList
                    data={state.comments.comments}
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