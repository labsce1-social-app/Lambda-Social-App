export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_IN_PLACE = 'LOGOUT_IN_PLACE'
export const RESET_AUTH_STATE = 'RESET_AUTH_STATE'
export const UNREGISTERED_ACCOUNT = 'UNREGISTERED_ACCOUNT'
// library for react native auth0
import Auth0 from 'react-native-auth0'

// need to add this in, then add to deployment as a variable
// this might change depending on how android store does it
const baseURL = process.env.REACT_APP_SERVER_URL

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