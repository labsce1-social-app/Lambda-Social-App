import React, { useEffect, useContext } from 'react';
import { Store } from '../context';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import Post from '../components/posts/Post';
import { getCommentsByDiscussionId } from '../utils/Requests';

const PostPage = ({ match }) => {
    // handle life cycle for comments
    const { _, dispatch } = useContext(Store);

    // need to get the data here because it is where we have access to the id from react router.
    const { id } = match.params;

    // useEffect is treated as componentDidMount and componentWillUnmount
    useEffect(() => {
        getCommentsByDiscussionId(id, dispatch)
    }, () => getCommentsByDiscussionId());

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
