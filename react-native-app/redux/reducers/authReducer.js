import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT,
    LOGOUT_IN_PLACE,
    RESET_AUTH_STATE,
    AUTH_INIT,
    UNREGISTERED_ACCOUNT
} from '../actions';

const initialState = {
    user: null,
    token: '',
    error: '',
    checkedUser: false,
    isFetching: false,
    userDidLogout: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INIT:
            return {
                ...state,
                error: '',
                isFetching: true,
                userDidLogout: false,
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isFetching: false,
                checkedUser: true
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: action.payload.error,
                isFetching: false,
                checkedUser: true
            };
        case UNREGISTERED_ACCOUNT:
            return {
                ...state,
                isFetching: false,
                checkedUser: true
            };
        case LOGOUT:
            return {
                ...initialState,
                userDidLogout: true,
                checkedUser: true
            }
        case LOGOUT_IN_PLACE: // used to logout a user and reset store
            return {
                ...initialState,
                checkedUser: true
            };
        case RESET_AUTH_STATE:
            return initialState;
        default:
            return state;
    }
}