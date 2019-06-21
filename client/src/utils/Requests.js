import React from 'react';
import {
  AUTH0_CLIENT,
  AUTH0_DOMAIN,
  BASE_URL,
  LOCAL
} from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';
const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;
const local = `http://localhost:3000`;
const base_url = `https://social-app-test.herokuapp.com`;
// place all HTTP requests in here
import AsyncStorage from '@react-native-community/async-storage';
import { Redirect } from 'react-router-native';

// getsDiscussions, can also take in a query string to sort the discussions, only good for top10 discussions on landing page.
export const getDiscussions = async (query, dispatch) => {
  // handle loading state
  const q = new URLSearchParams({ sort: query });
  try {
    dispatch({ type: 'TOP_DISCUSSIONS_FETCHING' });
    // fetch the data with query
    const response = await fetch(`${LOCAL}/discussions/?${q.toString()}`);
    // convert the data to json format otherwise you will just get a promise back
    const responseJson = await response.json();
    // set the data to global state
    dispatch({ type: 'TOP_DISCUSSIONS_FETCHED', payload: responseJson });
    // set splash to false so that it never renders again
    return dispatch({ type: 'SPLASH_TO_FALSE', payload: false });
  } catch (error) {
    // set the error to global state
    dispatch({ type: 'TOP_DISCUSSIONS_FAILED', payload: error });
    // throw error
    console.log(error);
  }
};

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = async (id, dispatch) => {
  // read previous function, they're almost the same
  dispatch({ type: 'COMMENTS_FETCHING' });
  try {
    const response = await fetch(`${LOCAL}/comments/d/${id}`);
    const resJSON = await response.json();
    return dispatch({ type: 'COMMENTS_FETCHED_SUCCESS', payload: resJSON });
  } catch (error) {
    dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: error });
    console.log(error);
  }
};

const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

// send a user to auth
export const handleAuth = async dispatch => {
  try {
    const getAuth = await auth0.webAuth.authorize({
      scope: 'openid profile email offline_access',
      audience: 'https://lambdasocial.auth0.com/userinfo',
      prompt: 'login'
    });

    const getUserWithAuth = await getUser(getAuth.accessToken, dispatch); // send access_token

    return getUserWithAuth;
  } catch (error) {
    console.log('error in login', error);
  }
};

// Call auth0 for user info
const getUser = async (token, dispatch) => {
  try {
    const user = await auth0.auth.userInfo({ token: token });

    const action = await dispatch({ type: 'SET_CURRENT_USER', payload: user });
    const followup = await makeUser(token, user);
    return {
      action,
      followup
    };
  } catch (err) {
    console.log(err);
  }
};

// save that access_token similar to localstorage
// and create a user in the database
const makeUser = async (token, info) => {
  // await AsyncStorage.setItem('accessToken', getAuth.accesstoken);
  const body = JSON.stringify({
    username: info.nickname,
    id: info.sub,
    email: info.email,
    avatar: info.picture
  }); // send  nickname as a 'username'
  try {
    const postUser = await fetch(`${LOCAL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    });
    return postUser;
  } catch (error) {
    console.log('error in sending user', error);
  }
};

// logout a user through state
export const handleLogout = async dispatch => {
  AsyncStorage.removeItem('accessToken');
  dispatch({ type: 'LOGOUT' });
  return <Redirect to="/home" />;
};

export const createSubtopic = async (info, sub, dispatch) => {
  console.log(sub);
  const body = JSON.stringify({
    title: info,
    creater_id: sub
  });

  try {
    const newCreate = await fetch(`${LOCAL}/subtopics/create`, {
      method: 'POST',
      body,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    console.log(newCreate);

    return dispatch({ type: 'CREATE_SUBTOPIC', payload: newCreate });
  } catch (error) {
    console.log(error);
  }
};
