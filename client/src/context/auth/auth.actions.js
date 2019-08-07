import {
  isEmpty,
  getData,
  axios,
  storeData,
  jwtDecode,
  deleteData,
  Auth0,
  auth0ClientId,
  auth0Domain,
  local,
  postgres
} from '../actions/constants';
import DeviceInfo from 'react-native-device-info';
import RNRestart from 'react-native-restart';
import {
  USER_UPDATING_LOADING,
  USER_UPDATED,
  USER_UPDATE_FAILED,
  LOGOUT,
  SET_CURRENT_USER,
  AUTH_FAIL
} from './auth.actions.js';

// check if a user is logged in
export const isAuthed = async dispatch => {
  try {
    const accessToken = await getData('accessToken');
    const followup = await dispatch({
      type: SET_CURRENT_USER,
      payload: accessToken
    });
    return { accessToken, followup };
  } catch (err) {
    const refresh = await getItem('refreshToken', {});
    const regToken = await auth0.auth.refreshToken({ refreshToken: refresh });
    setItem('accessToken', regToken);
    RNRestart.Restart();
    console.log(err);
  }
};

// send a user to auth0
const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

export const handleAuth = async dispatch => {
  let decUser;
  try {
    const getAuth = await auth0.webAuth.authorize({
      scope: 'openid profile email offline_access',
      audience: 'https://lambdasocial.auth0.com/api/v2/',
      // device: DeviceInfo.getUniqueID(),
      prompt: 'login'
    });
    const { idToken, accessToken, refreshToken } = getAuth;
    // rather than another call to auth0 decode idToken for info from auth0
    if (idToken) {
      decUser = await jwtDecode(idToken);
      await storeData('user', accessToken, {});
    } else {
      decUser = await jwtDecode(refreshToken);
      await storeData('refreshToken', refreshToken, {});
    }
    await storeData('accessToken', {
      username: decUser.nickname,
      avatar: decUser.picture,
      id: decUser.sub
    });

    const followup = await getUser(decUser, dispatch); // send access_token
    return followup;
  } catch (error) {
    console.log('error in login', error);
  }
};

// get user from our db
const getUser = async (user, dispatch) => {
  const userData = {
    username: user.nickname,
    id: user.sub,
    email: user.email,
    avatar: user.picture
  };

  try {
    const res = await axios.post(`${postgres}/users/profile`, { userData });

    if (res.data) {
      const send = await dispatch({
        type: SET_CURRENT_USER,
        payload: res.data // user's auth0 sub is being saved as id in state(state.user.id)
      });
      const storeUser = await storeData('accessToken', {
        username: res.data.username,
        avatar: res.data.avatar,
        id: res.data.id,
        title: res.data.title,
        created_at: res.data.created_at
      });

      return { send, storeUser };
    }
  } catch (err) {
    console.log('axios call error', err);
  }
};

// logout a user through state
export const handleLogout = async dispatch => {
  try {
    const del = await deleteData();
    const dis = await dispatch({ type: LOGOUT });
    return { del, dis };
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (dispatch, user) => {
  const { id, username, title } = user;
  dispatch({ type: USER_UPDATING_LOADING })
  try {
    const res = await axios.put(`${postgres}/users/`, { id, username, title });
    const followup = await dispatch({ type: USER_UPDATED, payload: res.data });
    return { res, followup }
  } catch (err) {
    console.log(err)
    return dispatch({ type: USER_UPDATE_FAILED });
  }
}