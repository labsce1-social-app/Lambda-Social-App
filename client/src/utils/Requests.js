import React from 'react';
import { AUTH0_CLIENT, AUTH0_DOMAIN, BASE_URL, LOCAL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;
const local = `http://localhost:3000`;
const base_url = `https://social-app-test.herokuapp.com`;
// place all HTTP requests in here
// import AsyncStorage from '@react-native-community/async-storage';
import { storeData, getData, deleteData } from './AsyncStorage';
// import { Redirect } from 'react-router-native';
// import AsyncStorage from '@react-native-community/async-storage';

// check if a user is logged in
export const isAuthed = async (dispatch) => {
  try {
    const value = getData('user').then((data) => {


      if (data !== null && data !== undefined) {
        return dispatch({ type: 'SET_CURRENT_USER', payload: data });
      }
    });
    return value;
  } catch (err) {
    console.log(err)
  }
}

// getsDiscussions, can also take in a query string to sort the discussions, only good for top10 discussions on landing page.
export const getDiscussions = async (query, dispatch) => {
  // handle loading state
  const q = new URLSearchParams({ sort: query });
  try {
    dispatch({ type: "TOP_DISCUSSIONS_FETCHING" });
    // fetch the data with query
    const response = await fetch(`${BASE_URL}/discussions/?${q.toString()}`);
    // convert the data to json format otherwise you will just get a promise back
    const responseJson = await response.json();
    // set the data to global state
    dispatch({ type: "TOP_DISCUSSIONS_FETCHED", payload: responseJson });
    // set splash to false so that it never renders again
    return dispatch({ type: 'SPLASH_TO_FALSE', payload: false });
  } catch (error) {
    // set the error to global state
    dispatch({ type: "TOP_DISCUSSIONS_FAILED", payload: error });
    // throw error
    console.log(error);
  };
};

export const getDiscussionsForSub = async (id, dispatch) => {
  // const url = 'http://localhost:3000'
  try {
    dispatch({ type: 'DISCUSSIONS_FETCHING' });
    const response = await fetch(`${BASE_URL}/discussions/s/${id}`);
    const resJson = await response.json();
    return dispatch({ type: 'DISCUSSIONS_FETCHED', payload: resJson });
  } catch (error) {
    dispatch({ type: 'DISCUSSIONS_FAILED', payload: error });
    console.log(error);
  }
};

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = async (id, dispatch) => {
  // read previous function, they're almost the same
  dispatch({ type: "COMMENTS_FETCHING" })
  try {
    const response = await fetch(`${BASE_URL}/comments/d/${id}`);
    const resJSON = await response.json();
    return dispatch({ type: "COMMENTS_FETCHED_SUCCESS", payload: resJSON });
  } catch (error) {
    dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: error })
    console.log(error)
  }
}

const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

// send a user to auth
export const handleAuth = async (dispatch) => {
  try {

    const getAuth = await auth0.webAuth
      .authorize({
        scope: 'openid profile email offline_access',
        audience: 'https://lambdasocial.auth0.com/userinfo',
        prompt: 'login'
      })
    const getUserWithAuth = await getUser(getAuth.accessToken, dispatch); // send access_token
    return getUserWithAuth;
  } catch (error) {
    console.log('error in login', error);
  }
};

// Call auth0 for user info
const getUser = async (token, dispatch) => {
  storeData('accessToken', token)
  try {
    const user = await auth0.auth.userInfo({ token: token })

    const action = await dispatch({ type: 'SET_CURRENT_USER', payload: user });
    const followup = await makeUser(token, user);
    return {
      action,
      followup,
      // setUser
    }
  } catch (err) {
    console.log(err)
  }
};

// save that access_token similar to localstorage
// and create a user in the database
const makeUser = async (token, info) => {
  const body = JSON.stringify({
    username: info.nickname,
    id: info.sub,
    email: info.email,
    avatar: info.picture
  }); // send  nickname as a 'username'
  try {
    const postUser = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
    return postUser
  } catch (error) {
    console.log('error in sending user', error);
  };
};

// logout a user through state
export const handleLogout = async (dispatch, history) => {
  try {
    const del = await deleteData()
    const dis = await dispatch({ type: 'LOGOUT' });
    return {
      del, dis
    }
    // return history.push('/home');
  } catch (err) {
    console.log(err)
  }
}

// handles aws image uploading
export const uploadImage = () => {
  ImagePicker.showImagePicker({}, (response) => {
    /*response returns an object with all of the information about the selected image.
    returns data, fileName, fileSize, height, isVertical, latitude, longitude, origURL,
    timestamp, type, uri, width.
    */
    // extract this data for the file upload
    const file = {
      uri: response.uri,
      name: response.fileName,
      type: 'image/png'
    }
    // s3 configurations
    const config = {
      keyPrefix: 's3/',
      bucket: 'lambdasocialbucket',
      region: 'us-east-1',
      accessKey: AWS_ACCESS_KEY_ID,
      secretKey: AWS_SECRET_ACCESS_KEY,
      successActionStatus: 201
    }
    RNS3.put(file, config)
      .then((response) => {
        if (response.status === 403) {
          console.log(response);
          throw new Error("Failed to upload image to S3");
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
      .catch((err) => {
        console.log(err)
      })
  })
}