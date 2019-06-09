import { FETCHING_DISCUSSIONS, DISCUSSIONS_FETCHED, DISCUSSIONS_FAILED, LOGOUT } from '../actions';

const initialState = {
    discussions: [],
    loading: false,
    error: ''
};

export const discussionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_DISCUSSIONS:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case DISCUSSIONS_FETCHED:
            return {
                ...state,
                loading: false,
                discussion: action.payload,
                error: ''
            };
        case DISCUSSIONS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}