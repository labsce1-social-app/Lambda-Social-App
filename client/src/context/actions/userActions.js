import { axios, postgres } from './constants';


export const updateUser = async (dispatch, user) => {
    const { id, username, title } = user;
    dispatch({ type: 'USER_UPDATING_LOADING' })
    try {
        const res = await axios.put(`${postgres}/users/`, { id, username, title });
        const followup = await dispatch({ type: 'USER_UPDATED', payload: res.data });
        return { res, followup }
    } catch (err) {
        console.log(err)
        return dispatch({ type: 'USER_UPDATE_FAILED' });
    }
}

export const viewUserProfile = async (userData) => {

    try {
        const res = await axios.post(`${postgres}/users/profile`, { userData });
        console.log(res)
        return res.data;
    } catch (err) {
        console.log(err)
    }
}