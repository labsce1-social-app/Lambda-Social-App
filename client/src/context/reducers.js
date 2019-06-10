// import { FETCHING_DISCUSSIONS, DISCUSSIONS_FETCHED, DISCUSSIONS_FAILED } from './constants';

export const initialState = {
    discussions: [],
    loading: false,
    error: ''
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHING_DISCUSSIONS":
            return {
                ...state,
                loading: true,
                error: ''
            };
        case "DISCUSSIONS_FETCHED":
            return {
                ...state,
                loading: false,
                discussions: action.payload,
                error: ''
            };
        case "DISCUSSIONS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}