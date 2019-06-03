export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_IN_PLACE = 'LOGOUT_IN_PLACE'
export const RESET_AUTH_STATE = 'RESET_AUTH_STATE'
export const UNREGISTERED_ACCOUNT = 'UNREGISTERED_ACCOUNT'
import Auth0 from 'react-native-auth0'

const baseURL = process.env.REACT_APP_SERVER_URL // need to add this in

// this will put token on headers for backend
export const authenticate = () => async dispatch => {
    dispatch({ type: AUTH_INIT })

    // wrap it in try catch to get auth0 errors
    try {
        // try to get current user from auth0
        const { currentUser }
    }
}