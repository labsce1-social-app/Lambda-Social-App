import {
    USER_UPDATING_LOADING,
    USER_UPDATED,
    USER_UPDATE_FAILED,
    LOGOUT,
    SET_CURRENT_USER,
    AUTH_FAIL
} from './auth.actions.js';

export const authState = {
    /* user & auth */
    isAuthenticated: false,
    user_update_loading: false,
    user: {},
    user_update_failed: '',
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                logged_out: false
            };
        case USER_UPDATING_LOADING:
            return {
                ...state,
                user_update_loading: true,
                user_update_failed: '',
            };
        case USER_UPDATED:
            return {
                ...state,
                user: action.payload,
                user_update_loading: false,
                user_update_failed: '',
            };
        case USER_UPDATE_FAILED:
            return {
                ...state,
                user_update_failed: action.payload,
                user_update_loading: false
            }
        case AUTH_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            break;
    }
}