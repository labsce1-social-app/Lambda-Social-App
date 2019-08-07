import { postgres, local, axios } from '../actions/constants';
import {
    CREATED_COMMENT,
    CREATING_COMMENT_FAILED,
    CREATED_REPLY,
    COMMENTS_FETCHING,
    COMMENTS_FETCHED_SUCCESS,
    COMMENTS_FETCHED_FAILED,
    VOTE_ACTION_FAILED,
    USER_DOWNVOTED,
    USER_UPVOTED
} from './comments.types.js';

// create a comment (not a reply)
export const addComment = async (dispatch, body) => {
    try {
        let res = await axios.post(`${postgres}/comments/create`, body);
        let followup = await dispatch({
            type: CREATED_COMMENT,
            payload: { ...res.data, replies: [] }
        });

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: CREATING_COMMENT_FAILED, payload: err })
    }
}

// create a comment (not a reply)
export const addCommentReply = async (dispatch, body) => {
    try {
        let res = await axios.post(`${postgres}/comments/create`, body);
        let followup = await dispatch({
            type: CREATED_REPLY,
            payload: res.data
        });

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: CREATING_COMMENT_FAILED, payload: err })
    }
}

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = async (id, dispatch, user_id) => {
    // read previous function, they're almost the same
    dispatch({ type: COMMENTS_FETCHING });
    const body = {
        user_id: user_id
    }
    try {
        const res = await axios.post(`${postgres}/comments/d/${id}`, body);
        return dispatch({ type: COMMENTS_FETCHED_SUCCESS, payload: res.data });
    } catch (err) {
        console.log(err);
        return dispatch({ type: COMMENTS_FETCHED_FAILED, payload: err });
    }
};

export const upvoteDiscussion = async (dispatch, body) => {
    try {
        let res = await axios.post(`${postgres}/upvotes/add`, body);
        let followup = await dispatch({
            type: USER_UPVOTED,
            payload: res.data
        })

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: VOTE_ACTION_FAILED, payload: err })
    }
}

export const downvoteDiscussion = async (dispatch, body) => {
    try {

        let res = await axios.post(`${postgres}/upvotes/subtract`, body);

        let followup = await dispatch({
            type: USER_DOWNVOTED,
            payload: res.data
        })

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: VOTE_ACTION_FAILED, payload: err })
    }
}
