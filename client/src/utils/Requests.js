import React from 'react';
import {
  AUTH0_CLIENT,
  AUTH0_DOMAIN,
  BASE_URL,
  LOCAL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from 'react-native-dotenv';
import { storeData, getData, deleteData } from './AsyncStorage';

import Auth0 from 'react-native-auth0';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { RNS3 } from 'react-native-aws3';

const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;
const local = `http://localhost:3000`;
const base_url = `https://social-app-test.herokuapp.com`;

// check if a user is logged in
export const isAuthed = async dispatch => {
  try {
    const value = getData('user').then(data => {
      if (data !== null && data !== undefined) {
        return dispatch({ type: 'SET_CURRENT_USER', payload: data });
      }
    });
    return value;
  } catch (err) {
    console.log(err);
  }
};

// getsDiscussions, can also take in a query string to sort the discussions, only good for top10 discussions on landing page.
export const getDiscussions = (query, dispatch) => {
  // handle loading state
  dispatch({ type: 'TOP_DISCUSSIONS_FETCHING' });

  const q = new URLSearchParams({ sort: query });

  axios
    .get(`${base_url}/discussions/?${q.toString()}`)
    .then(res => {
      console.log('AXIOS BB', res.data);
      dispatch({ type: 'TOP_DISCUSSIONS_FETCHED', payload: res.data });
    })
    .catch(err => {
      dispatch({ type: 'TOP_DISCUSSIONS_FAILED', payload: error });
      console.log(err);
    });

  // try {
  //   // fetch the data with query
  //   // const response = await fetch(`${base_url}/discussions/?${q.toString()}`);
  //   // convert the data to json format otherwise you will just get a promise back
  //   const responseJson = await response.json();
  //   // set the data to global state
  //   // set splash to false so that it never renders again
  //   return dispatch({ type: 'SPLASH_TO_FALSE', payload: false });
  // } catch (error) {
  //   // set the error to global state
  //   // throw error
  //   console.log(error);
  // }
};

export const getDiscussionsForSub = (id, dispatch) => {
  // const url = 'http://localhost:3000'
  dispatch({ type: 'DISCUSSIONS_FETCHING' });

  axios
    .get(`${base_url}/discussions/s/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({ type: 'DISCUSSIONS_FETCHED', payload: res.data });
    })
    .catch(err => {
      console.log(err);

      dispatch({ type: 'DISCUSSIONS_FAILED', payload: err });
    });

  // try {
  //   // const idJson = await id.json();
  //   const response = await fetch(`${base_url}/discussions/s/${id}`);
  //   const resJson = await response.json();
  //   return
  // } catch (error) {
  // }
};

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = (id, dispatch) => {
  // read previous function, they're almost the same
  dispatch({ type: 'COMMENTS_FETCHING' });

  axios
    .get(`${base_url}/comments/d/${id}`)
    .then(res => {
      console.log('get comments', res.data);
      dispatch({ type: 'COMMENTS_FETCHED_SUCCESS', payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: error });
    });

  // try {
  //   const response = await fetch(`${base_url}/comments/d/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     }
  //   });
  //   const resJSON = await response.json();
  //   return
  // } catch (error) {
  //   console.log(error);
  // }
};

// get all subtopics
export const getSubtopics = async dispatch => {
  dispatch({ type: 'SUBTOPICS_FETCHING' });

  axios
    .get(`${base_url}/subtopics`)
    .then(res => {
      console.log('subtopics', res.data);
      dispatch({ type: 'SUBTOPICS_FETCHED', payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: 'SUBTOPICS_FAILED', payload: error });
    });

  // try {
  //   const response = await fetch(`${base_url}/subtopics`);
  //   const resJson = await response.json();
  // } catch (error) {
  //   throw new Error(error);
  // }
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
    const decUser = jwtDecode(idToken);

    // console.log('handleAuth decoded', decUser);

    await storeData('accessToken', accessToken);

    await getUser(decUser, dispatch); // send access_token
  } catch (error) {
    console.log('error in login', error);
  }
};

// get user from our db
const getUser = async (user, dispatch) => {
  axios
    .get(`${base_url}/users/${user.sub}`)
    .then(res => {
      console.log('inside getuser axios res', res.data);

      // checking if we got a user exists in our db and skips the post
      if (res.data) {
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: res.data
        });
      } else {
        makeUser(user, dispatch);
      }
    })
    .catch(err => {
      console.log('axios call error', err);
    });
};

// and create a user in the database
const makeUser = async (info, dispatch) => {
  console.log(info);

  const body = {
    username: info.nickname,
    id: info.sub,
    email: info.email,
    avatar: info.picture
  }; // send  nickname as a 'username'

  axios
    .post(`${base_url}/users`, body)
    .then(res => {
      // console.log('post user', res.data);
      // const user = await auth0.auth.userInfo({ token: token });
      // console.log(body);

      dispatch({
        type: 'SET_CURRENT_USER',
        payload: body
      });
    })
    .catch(err => {
      console.log('error posting ', err);
    });

  // try {
  //   const postUser = await fetch(`${base_url}/users`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body
  //   });
  //   return postUser;
  // } catch (error) {
  //   console.log('error in sending user', error);
  // }
};

// logout a user through state
export const handleLogout = async dispatch => {
  try {
    const del = await deleteData();
    const dis = await dispatch({ type: 'LOGOUT' });
    return {
      del,
      dis
    };
    // return history.push('/home');
  } catch (err) {
    console.log(err);
  }
};

// handles aws image uploading
export const uploadImage = () => {
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
    RNS3.put(file, config)
      .then(response => {
        if (response.status === 403) {
          console.log(response);
          throw new Error('Failed to upload image to S3');
        } else {
          /*
          response will come back looking like this, we'll want
          the location for the POST request to make a discussion.
              location: "https://lambdasocialbucket.s3.amazonaws.com/s3%2FIMG_0111.HEIC"
          }
              */

          //TODO: remove this console log and replace it with code
          console.log(response.body.postResponse.location);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

// TODO: Change this and all other 'posts' to seperate file
export const createSubtopic = async (info, sub, dispatch) => {
  console.log(sub);
  const body = JSON.stringify({
    title: info,
    creater_id: sub
  });

  try {
    const newSubtopic = await fetch(`${base_url}/subtopics/create`, {
      method: 'POST',
      body,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const subId = await newSubtopic.json();
    // console.log(subId.id[0]);

    return dispatch({ type: 'CREATE_SUBTOPIC', payload: subId[0] });
  } catch (error) {
    console.log(error);
  }
};
