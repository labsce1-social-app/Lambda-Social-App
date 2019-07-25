import { isEmpty, getData, axios, storeData, jwtDecode, deleteData, Auth0, auth0ClientId, auth0Domain, local, postgres } from './constants';
import DeviceInfo from 'react-native-device-info';
import RNRestart from 'react-native-restart';

// check if a user is logged in
export const isAuthed = async dispatch => {
    try {
        const accessToken = await getData('accessToken');
        const followup = await dispatch({ type: 'SET_CURRENT_USER', payload: accessToken });
        return { accessToken, followup };
    } catch (err) {
        const refresh = await getItem("refreshToken", {})
        const regToken = await auth0.auth.refreshToken({ refreshToken: refresh })
        setItem("accessToken", regToken);
        RNRestart.Restart();
        console.log(err);
    }
};

// send a user to auth0
const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

export const handleAuth = async dispatch => {
    try {
        const getAuth = await auth0.webAuth.authorize({
            scope: 'openid profile email offline_access',
            audience: 'https://lambdasocial.auth0.com/api/v2/',
            // device: DeviceInfo.getUniqueID(),
            prompt: 'login'
        });
        const { idToken, accessToken, refreshToken } = getAuth;
        // rather than another call to auth0 decode idToken for info from auth0
        let decUser
        if (idToken) {
            decUser = await jwtDecode(idToken);
            await storeData('user', accessToken, {});
        } else {
            decUser = await jwtDecode(refreshToken);
            await storeData('refreshToken', refreshToken, {})
        }
        await storeData('accessToken', {
            username: decUser.nickname,
            avatar: decUser.picture,
            id: decUser.sub
        });
        console.log("IDTOKEN: ", decUser)
        const followup = await getUser(decUser, dispatch); // send access_token
        return followup;
    } catch (error) {
        console.log('error in login', error);
    }
};

// get user from our db
const getUser = async (user, dispatch) => {

    try {
        const res = await axios.post(`${postgres}/users/profile`, { id: user.sub });

        if (res.data) {
            const send = await dispatch({
                type: 'SET_CURRENT_USER',
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
        return makeUser(user, dispatch);
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
        const make = await axios.post(`${postgres}/users`, body);
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