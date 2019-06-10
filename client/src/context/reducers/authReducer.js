
// library for react native auth0
import Auth0 from 'react-native-auth0';
import { BASE_URL } from 'react-native-dotenv';

// need to add this in, then add to deployment as a variable
// this might change depending on how android store does it

// this will put token on headers for backend
export const authenticate = () => async dispatch => {
    dispatch({ type: AUTH_INIT })

    // wrap it in try catch to get auth0 errors
    try {
        // TODO: try to get current user from auth0
        // TODO: if user exists,
        // get the token and put it in the store
        // then send to backend for auth

    } catch (error) {
        // if any uncaught errors in login async process, dispatch an error
        dispatch({ type: AUTH_FAIL, payload: { error: 'Auth0 error' } })
    }
};