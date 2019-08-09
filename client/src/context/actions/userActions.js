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

export const viewUserProfile = async (userData, setData) => {

    try {
        const res = await axios.post(`${postgres}/users/profile`, { userData });
        let { data } = res;
        return setData(data);
    } catch (err) {
        console.log(err)
    }
}