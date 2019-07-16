import React from 'react';
import {
  AUTH0_CLIENT,
  AUTH0_DOMAIN,
  BASE_URL,
  LOCAL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  POSTGRES
} from 'react-native-dotenv';
import { storeData, getData, deleteData } from './AsyncStorage';
import { isEmpty } from './utility';
import Auth0 from 'react-native-auth0';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { RNS3 } from 'react-native-aws3';

const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;
const local = `http://192.168.137.1:3000`;
const base_url = `https://social-app-test.herokuapp.com`;
const postgres = 'https://lambdasocial-postgres.herokuapp.com';

// check if a user is logged in
export const isAuthed = async dispatch => {
  try {
    const value = await getData('accessToken');
    if (!isEmpty(value)) {
      return dispatch({ type: 'SET_CURRENT_USER', payload: value });
    }
    return value;
  } catch (err) {
    console.log(err);
  }
};

// getsDiscussions, can also take in a query string to sort the discussions, only good for top10 discussions on landing page.
export const getDiscussions = async (query, dispatch) => {
  // handle loading state
  const q = new URLSearchParams({ sort: query });
  dispatch({ type: 'TOP_DISCUSSIONS_FETCHING', payload: true });
  try {
    const res = await axios.get(`${local}/discussions/?${q.toString()}`);
    return dispatch({ type: 'TOP_DISCUSSIONS_FETCHED', payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: 'TOP_DISCUSSIONS_FAILED', payload: err });
  }
};

export const getDiscussionsForSub = async (id, dispatch) => {
  try {
    await dispatch({ type: 'DISCUSSIONS_FETCHING', payload: true });
    const res = await axios.get(`${local}/discussions/s/${id}`);
    return dispatch({ type: 'DISCUSSIONS_FETCHED', payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: 'DISCUSSIONS_FAILED', payload: err });
  }
};

export const getRecentDiscussions = async (id, dispatch) => {
  const body = {
    id
  };
  try {
    await dispatch({ type: 'DISCUSSIONS_FETCHING', payload: true });
    const res = await axios.post(`${local}/discussions/recent`, body);
    console.log(res.data);
    return dispatch({
      type: 'DISCUSSIONS_FETCHED',
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    return dispatch({ type: 'DISCUSSIONS_FAILED', payload: err });
  }
};

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = async (id, dispatch, user_id) => {
  // read previous function, they're almost the same
  dispatch({ type: 'COMMENTS_FETCHING' });
  const body = {
    user_id: user_id
  };
  try {
    const res = await axios.post(`${local}/comments/d/${id}`, body);
    return dispatch({ type: 'COMMENTS_FETCHED_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: err });
  }
};

// get all subtopics
export const getSubtopics = async dispatch => {
  dispatch({ type: 'SUBTOPICS_FETCHING' });
  try {
    const res = await axios.get(`${local}/subtopics`);
    return dispatch({ type: 'SUBTOPICS_FETCHED', payload: res.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: 'SUBTOPICS_FAILED', payload: err });
  }
};

// send a user to auth0
const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

export const handleAuth = async dispatch => {
  try {
    const getAuth = await auth0.webAuth.authorize({
      scope: 'openid profile email offline_access',
      audience: 'https://lambdasocial.auth0.com/api/v2/',
      prompt: 'login'
    });
    const { idToken, accessToken } = getAuth;
    // rather than another call to auth0 decode idToken for info from auth0
    const decUser = await jwtDecode(idToken);
    const storeUser = await storeData('user', accessToken);
    const followup = await getUser(decUser, dispatch); // send access_token
    return { storeUser, followup };
  } catch (error) {
    console.log('error in login', error);
  }
};

// get user from our db
const getUser = async (user, dispatch) => {
  storeData('accessToken', {
    username: user.nickname,
    avatar: user.picture,
    id: user.sub
  });
  try {
    const res = await axios.get(`${local}/users/${user.sub}`);
    if (res.data) {
      const send = await dispatch({
        type: 'SET_CURRENT_USER',
        payload: res.data // user's auth0 sub is being saved as id in state(state.user.id)
      });
      return send;
    } else {
      return makeUser(user, dispatch);
    }
  } catch (err) {
    console.log('axios call error', err);
  }
};

// and create a user in the database
const makeUser = async (info, dispatch) => {
  const body = {
    username: info.nickname,
    id: info.sub,
    email: info.email,
    avatar: info.picture
  }; // send  nickname as a 'username'
  try {
    const make = await axios.post(`${local}/users`, body);
    const followup = await dispatch({
      type: 'SET_CURRENT_USER',
      payload: body
    });
    return { make, followup };
  } catch (err) {
    console.log('error posting ', err);
  }
};

// logout a user through state
export const handleLogout = async dispatch => {
  try {
    const del = await deleteData();
    const dis = await dispatch({ type: 'LOGOUT' });
    return { del, dis };
  } catch (err) {
    console.log(err);
  }
};

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
    dispatch({ type: 'SENDING_IMAGE' });
    RNS3.put(file, config)
      .then(response => {
        console.log(response);
        if (response.status === 403) {
          return dispatch({
            type: 'IMAGE_FAILED',
            payload: 'Failed to upload image to S3'
          });
        } else {
          /*
          response will come back looking like this, we'll want
          the location for the POST request to make a discussion.
              location: "https://lambdasocialbucket.s3.amazonaws.com/s3%2FIMG_0111.HEIC"
        */
          return dispatch({
            type: 'IMAGE_SUCCESS',
            payload: response.body.postResponse.location
          });
        }
      })
      .catch(err => {
        console.log(err);
        return dispatch({ type: 'IMAGE_FAILED', payload: err });
      });
  });
};

// TODO: Change this and all other 'posts' to seperate file
export const createSubtopic = async (info, sub, dispatch) => {
  dispatch({ type: 'SUBTOPICS_FETCHING' });
  const body = {
    title: info,
    creater_id: sub
  };
  try {
    const res = await axios.post(`${local}/subtopics/create`, body);

    // console.log(res.data.subtopic[0]);
    const followup = await dispatch({
      type: 'CREATE_SUBTOPIC',
      payload: res.data.subtopic[0]
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
  }
};

export const addDiscussion = async (body, dispatch, nav) => {
  console.log('post discussion', body);

  const apiBody = {
    title: body.title,
    content: body.content,
    image: body.image,
    creater_id: body.creater_id,
    subtopic_id: body.subtopic_id
  };

  try {
    let res = await axios.post(`${local}/discussions/create`, apiBody);
    // console.log(res.data);
    let followup = await dispatch({
      type: 'CREATED_DISCUSSION',
      payload: res.data.discussion[0]
    });

    return { res, followup };
  } catch (err) {
    console.log('nothing works');
    console.log(err);
  }
};

// create a comment (not a reply)
export const addComment = async (dispatch, body) => {
  const newReply = {
    user_id: body.user_id,
    comment_post: body.comment_post,
    discussion_id: body.discussion_id,
    username: body.username
  };
  try {
    let res = await axios.post(`${local}/comments/create`, body);
    let followup = await dispatch({
      type: 'CREATED_COMMENT',
      payload: newReply
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
    dispatch({ type: 'CREATING_COMMENT_FAILED', payload: err });
  }
};

// create a comment (not a reply)
export const addCommentReply = async (dispatch, body) => {
  const newReply = {
    user_id: body.user_id,
    comment_post: body.comment_post,
    discussion_id: body.discussion_id,
    comment_id: body.comment_id,
    username: body.username
  };
  try {
    let res = await axios.post(`${local}/comments/create/reply`, body);
    let followup = await dispatch({
      type: 'CREATED_REPLY',
      payload: newReply
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
    dispatch({ type: 'CREATING_COMMENT_FAILED', payload: err });
  }
};

export const upvoteDiscussion = async (dispatch, body) => {
  try {
    let res = await axios.post(`${local}/upvotes/add`, body);
    let followup = await dispatch({
      type: 'USER_UPVOTED',
      payload: body
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
    dispatch({ type: 'VOTE_ACTION_FAILED', payload: err });
  }
};

export const downvoteDiscussion = async (dispatch, body) => {
  try {
    let res = await axios.delete(`${local}/upvotes/subtract`, { data: body });

    let followup = await dispatch({
      type: 'USER_DOWNVOTED',
      payload: body
    });

    return { res, followup };
  } catch (err) {
    console.log(err);
    dispatch({ type: 'VOTE_ACTION_FAILED', payload: err });
  }
};

export const getFavoriteSubtopics = async (dispatch, id) => {
  console.log('USER ID SENDING', id);
  try {
    let res = await axios.get(`${local}/subtopic_users/${id}`);

    console.log(res.data);

    dispatch({ type: 'FAVORITE_SUBTOPICS_FETCHED', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const favoriteTheSubtopic = async (dispatch, sub) => {
  // console.log(sub);

  try {
    let res = axios.post(`${local}/subtopic_users/favorite`, sub);

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
    let res = await axios.post(`${local}/subtopic_users/unfavorite`, unSub);

    return dispatch({ type: 'UN_FAVORITE', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
