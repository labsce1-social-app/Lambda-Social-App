import {
    SENDING_IMAGE,
    IMAGE_FAILED,
    IMAGE_SUCCESS,
    TOP_DISCUSSIONS_FETCHING,
    TOP_DISCUSSIONS_FETCHED,
    TOP_DISCUSSIONS_FAILED,
    DISCUSSIONS_FETCHING,
    DISCUSSIONS_FETCHED,
    DISCUSSIONS_FAILED,
    RESET_IMAGE,
    CREATED_DISCUSSION,
    CREATE_DISCUSSION_FAILED,
    FETCH_HASHTAGS_FAILED,
    SORT_CHANGE_SUCCESS,
    FETCHING_HASHTAGS,
    FETCH_HASHTAGS_SUCCESSFULLY
} from './discussions.types';

export const discussionState = {
    /* discussions */
    top_discussions: [],
    top_discussions_loading: false,
    top_discussions_error: '',
    sortBy: 'upvotes',
    discussions: [],
    discussions_loading: false,
    discussions_error: '',
    discussions_error: '',
    hashtags: null,
    hashtags_loading: false,
    hashtags_error: '',
    newImage: null,
    newImage_error: '',
}
export const discussionReducer = (state, action) => {
    console.log("DISCUSSION STATE: ", state)
    switch (action.payload) {
        case TOP_DISCUSSIONS_FETCHING:
            return {
                ...state,
                top_discussons_loading: action.payload,
                top_discussions_error: ''
            };
        case TOP_DISCUSSIONS_FETCHED:
            return {
                ...state,
                top_discussons_loading: false,
                top_discussions: action.payload,
                error: ''
            };
        case TOP_DISCUSSIONS_FAILED:
            return {
                ...state,
                top_discussons_loading: false,
                top_discussions_error: action.payload
            };
        case SORT_CHANGE_SUCCESS:
            return {
                ...state,
                top_discussions_loading: false,
                sortBy: action.payload
            };
        case DISCUSSIONS_FETCHING:
            return {
                ...state,
                discussions_loading: true,
                discussions_error: ''
            };
        case DISCUSSIONS_FETCHED:
            return {
                ...state,
                discussions: action.payload,
                discussions_loading: false
            };
        case DISCUSSIONS_FAILED:
            return {
                ...state,
                discussions_loading: false,
                discussions_error: action.payload
            };
        case CREATED_DISCUSSION:
            return {
                ...state,
                newImage: '',
                discussions: action.payload,
                discussions_loading: false,
                discussions_error: ''
            };
        case CREATE_DISCUSSION_FAILED:
            return {
                ...state,
                dscussions_error: action.payload
            };
        case SENDING_IMAGE:
            return {
                ...state,
                newImage_loading: true,
                newImage: '',
                newImage_error: ''
            };
        case IMAGE_SUCCESS:
            return {
                ...state,
                newImage_loading: false,
                newImage: action.payload,
                newImage_error: ''
            };
        case IMAGE_FAILED:
            return {
                ...state,
                newImage_loading: false,
                newImage: '',
                newImage_error: action.payload
            };
        case RESET_IMAGE:
            return {
                ...state,
                newImage: ''
            };
        case FETCHING_HASHTAGS:
            return {
                ...state,
                hashtags_loading: true,
                hashtags_error: ''
            };
        case FETCH_HASHTAGS_SUCCESSFULLY:
            return {
                ...state,
                hashtags: action.payload,
                hashtags_loading: false,
                hashtags_error: ''
            };
        case FETCH_HASHTAGS_FAILED:
            return {
                ...state,
                hashtags_loading: false,
                hashtags_error: action.payload
            };
        default:
            break;
    }
}