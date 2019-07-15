import { axios, local, postgres } from './constants';

export const createSubtopic = async (info, sub, dispatch) => {
    dispatch({ type: 'SUBTOPICS_FETCHING' });
    const body = {
        title: info,
        creater_id: sub
    };
    try {
        const res = await axios.post(`${postgres}/subtopics/create`, body);

        const followup = await dispatch({
            type: 'CREATE_SUBTOPIC',
            payload: res.data.subtopic[0]
        });

        return { res, followup };
    } catch (err) {
        dispatch({
            type: 'CREATE_SUBTOPIC_FAILED',
            payload: err.response.data
        })
    }
};

// get all subtopics
export const getSubtopics = async dispatch => {
    dispatch({ type: 'SUBTOPICS_FETCHING' });
    try {
        const res = await axios.get(`${postgres}/subtopics`);
        return dispatch({ type: 'SUBTOPICS_FETCHED', payload: res.data });
    } catch (err) {
        console.log(err);
        return dispatch({ type: 'SUBTOPICS_FAILED', payload: err });
    }
};