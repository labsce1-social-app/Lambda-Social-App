import postgres from './constants';
import axios from 'axios';

export const updateUser = async (dispatch, user) => {
    console.log(user)
    dispatch({ type: 'USER_UPDATING_LOADING' })
    try {
        const res = await axios.put(`${postgres}/users/${user.id}`, user);
        console.log(res.data)
        const followup = await dispatch({ type: 'USER_UPDATED', payload: res.data });
        return { res, followup }
    } catch (err) {
        console.log(err)
        return dispatch({ type: 'USER_UPDATE_FAILED' });
    }
}