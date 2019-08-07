import {
    CREATED_COMMENT,
    CREATING_COMMENT_FAILED,
    CREATED_REPLY,
    COMMENTS_FETCHING,
    COMMENTS_FETCHED_SUCCESS,
    COMMENTS_FETCHED_FAILED,
    VOTE_ACTION_FAILED,
    USER_DOWNVOTED,
    USER_UPVOTED
} from './comments.types.js';

export const commentState = {
    /* comments */
    comments: null,
    comments_loading: false,
    comments_error: '',
    upvote_error: '',
}
export const commentsReducer = (state, action) => {
    switch (action) {
        case CREATED_COMMENT:
            const { comments } = state.comments;
            return {
                ...state,
                comments: {
                    ['0']: { ...state.comments['0'] },
                    comments: [...comments, action.payload]
                },
                comments_error: ''
            };
        case CREATING_COMMENT_FAILED:
            return {
                ...state,
                comments_error: action.paload
            };
        case CREATED_REPLY:
            return {
                ...state,
                comments: {
                    ['0']: { ...state.comments['0'] },
                    comments: state.comments.comments.map(comment => {
                        if (action.payload.comment_id === comment.id) {
                            return {
                                ...comment,
                                replies: [...comment.replies, action.payload]
                            };
                        } else {
                            return comment;
                        }
                    })
                }
            };
        case USER_UPVOTED:
            return {
                ...state,
                comments: {
                    ['0']: {
                        ...state.comments[0],
                        upvotes: action.payload,
                        voted: true
                    },
                    comments: [...state.comments.comments]
                }
            };
        case USER_DOWNVOTED:
            return {
                ...state,
                comments: {
                    ['0']: {
                        ...state.comments[0],
                        upvotes: action.payload,
                        voted: true
                    },
                    comments: [...state.comments.comments]
                }
            };
        case VOTE_ACTION_FAILED:
            return {
                ...state,
                upvote_error: action.payload
            };
        case COMMENTS_FETCHING:
            return {
                ...state,
                comments_loading: true,
                comments_error: ''
            };
        case COMMENTS_FETCHED_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                comments_loading: false,
                comments_error: ''
            };
        case COMMENTS_FETCHED_FAILED:
            return {
                ...state,
                comments: initialState.comments,
                comments_loading: false,
                comments_error: action.payload
            };
        default:
            break;
    }
}