import { postgres, local, axios, } from './constants';

export const upvoteDiscussion = async (dispatch, body) => {
    try {
        let res = await axios.post(`${postgres}/upvotes/add`, body);
        let followup = await dispatch({
            type: 'USER_UPVOTED',
            payload: res.data
        })

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: 'VOTE_ACTION_FAILED', payload: err })
    }
}

export const downvoteDiscussion = async (dispatch, body) => {
    try {

        let res = await axios.post(`${postgres}/upvotes/subtract`, body);

        let followup = await dispatch({
            type: 'USER_DOWNVOTED',
            payload: res.data
        })

        return { res, followup };
    } catch (err) {
        console.log(err)
        dispatch({ type: 'VOTE_ACTION_FAILED', payload: err })
    }
}
