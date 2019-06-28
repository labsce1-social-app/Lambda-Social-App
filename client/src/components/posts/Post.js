import React, { useContext, lazy, Suspense } from 'react';
import { Store } from '../../context/';
import { FlatList, Text } from 'react-native';
import { Card } from 'native-base';
import PostHeader from './PostHeader';
import style from './Style';
const Comment = lazy(() => import('./Comment'));
import { isEmpty } from '../../utils/utility'
import Reply from './Reply';

// get's discussion id from Route through match.params.id
const Post = () => {
    // bring in state and dispatch
    const { state, dispatch } = useContext(Store);
    const { comments, comments_loading } = state;
    return state.comments_loading ? <Text style={style.container}>Loading... </Text> : (
        <Card style={style.container}>
            {!isEmpty(comments) && comments_loading === false ? (
                <Suspense fallback={<Text>Loading... </Text>}>
                    <PostHeader
                        // creator_avatar={}
                        creator={comments.creator[0].creator}
                        discussion_image={comments.creator[0].discussion_image.replace('http://', 'https://')}
                        discussion_content={comments.creator[0].discussion_content}
                        discussion_date={comments.creator[0].discussion_date}
                        upvotes={comments.creator[0].upvotes}
                    />
                </Suspense>
            ) : null}
            <Text>Comments</Text>

            {!isEmpty(comments) && comments_loading === false ? (
                <FlatList
                    data={comments.comments}
                    renderItem={({ item }) => {
                        return (
                            <Suspense fallback={<Text>Loading... </Text>}>

                                <Comment
                                    image={item.orignal_commenter_avatar}
                                    date={item.original_created_date}
                                    name={item.original_commenter}
                                    comment={item.original_post}
                                />
                                {!isEmpty(item.reply_post) ?
                                    <Reply
                                        image={item.reply_commenter_avatar}
                                        date={item.reply_created_date}
                                        name={item.reply_commenter}
                                        comment={item.reply_post} />
                                    : null}
                            </Suspense>
                        )
                    }}
                    keyExtractor={(item, index) => `${index}-${item.comment_id}`}
                />
            ) : !isEmpty(comments) && comments.comments.length === 0 ? (
                <Comment
                    image="../../assets/lambdaschool.png"
                    date={new Date().now()}
                    name="LambdaBot"
                    comment="No one has posted yet"
                />
            ) : <Text> Loading...</Text>}
        </Card >
    );
}

export default Post;