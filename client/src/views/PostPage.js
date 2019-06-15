import React, { useEffect, useContext } from 'react';
import { Store } from '../context';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import Post from '../components/posts/Post';
import { getCommentsByDiscussionId } from '../utils/Requests';

const PostPage = ({ match }) => {
    // handle life cycle for comments
    const { _, dispatch } = useContext(Store);

    const { id } = match.params;
    useEffect(() => {
        getCommentsByDiscussionId(id, dispatch)
    }, getCommentsByDiscussionId());

    return (
        <NavWrapper>
            <Header
            >
                Post
        </Header>
            <Post />
        </NavWrapper>
    );
}
export default PostPage;
