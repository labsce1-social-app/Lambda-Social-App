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
    });
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

export const getFavoriteSubtopics = async (dispatch, id) => {
  // console.log('USER ID SENDING', id);
  try {
    let res = await axios.get(`${postgres}/subtopic_users/${id}`);

    console.log(res.data);

    dispatch({ type: 'FAVORITE_SUBTOPICS_FETCHED', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const favoriteTheSubtopic = async (dispatch, sub) => {
  // console.log(sub);

  try {
    let res = await axios.post(`${postgres}/subtopic_users/favorite`, sub);

    let followup = await dispatch({
      type: 'SUBTOPIC_FAVORITED',
      payload: res.data
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
  }
};

export const unFavoriteTheSubtopic = async (dispatch, sub) => {
  // console.log('SUB TO UNSUB', sub);
  const unSub = {
    subId: sub.subId,
    userId: sub.userId
  };

  try {
    let res = await axios.post(`${postgres}/subtopic_users/unfavorite`, unSub);

    return dispatch({ type: 'UN_FAVORITE', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
