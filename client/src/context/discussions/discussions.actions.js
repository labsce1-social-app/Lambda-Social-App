import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  RNS3,
  ImagePicker,
  axios,
  local,
  postgres
} from '../actions/constants';
import {
  SENDING_IMAGE,
  IMAGE_FAILED,
  IMAGE_SUCCESS,
  TOP_DISCUSSIONS_FETCHING,
  TOP_DISCUSSIONS_FETCHED,
  TOP_DISCUSSIONS_FAILED,
  DISCUSSIONS_FETCHING,
  DISCUSSIONS_FETCHED,
  DISCUSSIONS_FAILED,
  RESET_IMAGE,
  CREATED_DISCUSSION,
  CREATE_DISCUSSION_FAILED,
  FETCH_HASHTAGS_FAILED,
  SORT_CHANGE_SUCCESS,
  FETCHING_HASHTAGS,
  FETCH_HASHTAGS_SUCCESSFULLY
} from './discussions.types';

// handles aws image uploading
export const uploadImage = dispatch => {
  ImagePicker.showImagePicker({}, response => {
    /*response returns an object with all of the information about the selected image.
        returns data, fileName, fileSize, height, isVertical, latitude, longitude, origURL,
        timestamp, type, uri, width.
        */
    // extract this data for the file upload
    const file = {
      uri: response.uri,
      name: response.fileName,
      type: 'image/png'
    };
    // s3 configurations
    const config = {
      keyPrefix: 's3/',
      bucket: 'lambdasocialbucket',
      region: 'us-east-1',
      accessKey: AWS_ACCESS_KEY_ID,
      secretKey: AWS_SECRET_ACCESS_KEY,
      successActionStatus: 201
    };
    dispatch({ type: SENDING_IMAGE });
    RNS3.put(file, config)
      .then(response => {
        if (response.status === 403) {
          return dispatch({
            type: IMAGE_FAILED,
            payload: 'Failed to upload image to S3'
          });
        } else {
          /*
                    response will come back looking like this, we'll want
                    the location for the POST request to make a discussion.
                        location: "https://lambdasocialbucket.s3.amazonaws.com/s3%2FIMG_0111.HEIC"
                  */
          return dispatch({
            type: IMAGE_SUCCESS,
            payload: response.body.postResponse.location
          });
        }
      })
      .catch(err => {
        console.log(err);
        return dispatch({ type: IMAGE_FAILED, payload: err });
      });
  });
};

export const getDiscussions = async (query, dispatch) => {
  // handle loading state
  const q = new URLSearchParams({ sort: query });
  dispatch({ type: TOP_DISCUSSIONS_FETCHING, payload: true });
  try {
    const res = await axios.get(`${postgres}/discussions/?${q.toString()}`);
    return dispatch({ type: TOP_DISCUSSIONS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: TOP_DISCUSSIONS_FAILED, payload: err });
  }
};

export const getDiscussionsForSub = async (id, dispatch) => {
  try {
    await dispatch({ type: DISCUSSIONS_FETCHING, payload: true });
    const res = await axios.get(`${postgres}/discussions/s/${id}`);
    return dispatch({ type: DISCUSSIONS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: DISCUSSIONS_FAILED, payload: err });
  }
};

export const getRecentDiscussions = async (id, dispatch) => {
  const body = {
    id
  };
  try {
    await dispatch({ type: DISCUSSIONS_FETCHING, payload: true });
    const res = await axios.post(`${postgres}/discussions/recent`, body);
    return dispatch({
      type: DISCUSSIONS_FETCHED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    return dispatch({ type: DISCUSSIONS_FAILED, payload: err });
  }
};

export const removeImage = async dispatch => {
  return await dispatch({ type: RESET_IMAGE });
};

export const addDiscussion = async (body, dispatch) => {

  dispatch({ type: DISCUSSIONS_FETCHING });
  const apiBody = {
    title: body.title,
    content: body.content,
    image: body.image,
    creater_id: body.creater_id,
    subtopic_id: body.subtopic_id,
    hashtags: body.hashtag
  };

  try {
    let res = await axios.post(`${postgres}/discussions/create`, apiBody);

    let followup = await dispatch({
      type: CREATED_DISCUSSION,
      payload: res.data
    });

    return { res, followup };
  } catch (err) {
    dispatch({
      type: CREATE_DISCUSSION_FAILED,
      payload: res.response.data
    });
    console.log(err);
  }
};

export const getHashtags = async dispatch => {
  dispatch({ type: FETCHING_HASHTAGS });
  try {
    let res = await axios.post(`${postgres}/discussions/hashtags`);
    let followup = await dispatch({
      type: 'FETCH_HASHTAGS_SUCCESSFULLY',
      payload: res.data
    });
    return { res, followup };
  } catch (err) {
    dispatch({ type: FETCH_HASHTAGS_FAILED, payload: err });
  }
};

export const getByHashtags = async (dispatch, hashtag) => {
  dispatch({ type: DISCUSSIONS_FETCHING });
  try {
    let res = await axios.post(`${postgres}/discussions/byhashtags`, {
      hash: hashtag
    });
    let followup = await dispatch({
      type: DISCUSSIONS_FETCHED,
      payload: res.data
    });
    return { res, followup };
  } catch (err) {
    dispatch({ type: DISCUSSIONS_FAILED, payload: err });
  }
};

export const getStats = async (setStats) => {
  try {
    let res = await axios.post(`${postgres}/discussions/stats`)
    setStats(res.data);
  } catch (err) {
    console.log(error)
  }
}