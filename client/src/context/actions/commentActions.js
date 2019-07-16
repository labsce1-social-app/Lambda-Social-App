import { postgres, local, axios } from './constants';

// create a comment (not a reply)
export const addComment = async (dispatch, body) => {
    const newReply = {
        user_id: body.user_id,
        comment_post: body.comment_post,
        discussion_id: body.discussion_id,
        username: body.username
    }
    try {
        let res = await axios.post(`${postgres}/comments/create`, body);
        let followup = await dispatch({
            type: 'CREATED_COMMENT',
            payload: newReply
        });

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: 'CREATING_COMMENT_FAILED', payload: err })
    }
}

// create a comment (not a reply)
export const addCommentReply = async (dispatch, body) => {
    const newReply = {
        user_id: body.user_id,
        comment_post: body.comment_post,
        discussion_id: body.discussion_id,
        comment_id: body.comment_id,
        username: body.username
    }
    try {
        let res = await axios.post(`${postgres}/comments/create/reply`, body);
        let followup = await dispatch({
            type: 'CREATED_REPLY',
            payload: newReply
        });

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: 'CREATING_COMMENT_FAILED', payload: err })
    }
}

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = async (id, dispatch, user_id) => {
    // read previous function, they're almost the same
    dispatch({ type: 'COMMENTS_FETCHING' });
    const body = {
        user_id: user_id
    }
    try {
        const res = await axios.post(`${postgres}/comments/d/${id}`, body);
        return dispatch({ type: 'COMMENTS_FETCHED_SUCCESS', payload: res.data });
    } catch (err) {
        console.log(err);
        return dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: err });
    }
};