import { axios, local, postgres } from '../actions/constants';
import { SUBTOPICS_FETCHING, CREATE_SUBTOPIC, CREATE_SUBTOPIC_FAILED, FAVORITE_SUBTOPICS_FETCHED, SUBTOPIC_FAVORITED, UN_FAVORITE, SUBTOPICS_FAILED, SUBTOPICS_FETCHED } from './subtopics.types';

export const createSubtopic = async (info, sub, dispatch) => {
  dispatch({ type: SUBTOPICS_FETCHING });
  const body = {
    title: info,
    creater_id: sub
  };
  try {
    const res = await axios.post(`${postgres}/subtopics/create`, body);

    const followup = await dispatch({
      type: CREATE_SUBTOPIC,
      payload: res.data.subtopic[0]
    });

    return { res, followup };
  } catch (err) {
    dispatch({
      type: CREATE_SUBTOPIC_FAILED,
      payload: err.response.data
    });
  }
};

// get all subtopics
export const getSubtopics = async dispatch => {
  dispatch({ type: SUBTOPICS_FETCHING });
  try {
    const res = await axios.get(`${postgres}/subtopics`);
    return dispatch({ type: SUBTOPICS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: SUBTOPICS_FAILED, payload: err });
  }
};

export const getFavoriteSubtopics = async (dispatch, id) => {
  try {
    let res = await axios.get(`${postgres}/subtopic_users/${id}`);
    dispatch({ type: FAVORITE_SUBTOPICS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const favoriteTheSubtopic = async (dispatch, sub) => {

  try {
    let res = await axios.post(`${postgres}/subtopic_users/favorite`, sub);

    let followup = await dispatch({
      type: SUBTOPIC_FAVORITED,
      payload: res.data
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
  }
};

export const unFavoriteTheSubtopic = async (dispatch, sub) => {
  const unSub = {
    subId: sub.subId,
    userId: sub.userId
  };

  try {
    let res = await axios.post(`${postgres}/subtopic_users/unfavorite`, unSub);

    return dispatch({ type: UN_FAVORITE, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
