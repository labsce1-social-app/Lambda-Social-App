import {
    SUBTOPICS_FETCHING,
    CREATE_SUBTOPIC,
    CREATE_SUBTOPIC_FAILED,
    FAVORITE_SUBTOPICS_FETCHED,
    SUBTOPIC_FAVORITED,
    UN_FAVORITE,
    SUBTOPICS_FETCHED,
    SUBTOPICS_FAILED
} from './subtopics.types';

export const subtopicState = {
    /* subtopics */
    subtopics: null,
    favorite_subtopics: null,
    subtopics_loading: false,
    subtopics_error: '',
}

export const subtopicsReducer = (state, action) => {
    switch (action) {
        case FAVORITE_SUBTOPICS_FETCHED:
            return {
                ...state,
                favorite_subtopics: action.payload
            };
        case SUBTOPIC_FAVORITED:
            return {
                ...state,
                favorite_subtopics: action.payload
            };
        case UN_FAVORITE:
            return {
                ...state,
                favorite_subtopics: state.favorite_subtopics.filter(item => {
                    const id = action.payload[0];
                    if (item.id !== id) {
                        return item;
                    }
                })
            };
        case CREATE_SUBTOPIC:
            const { title, creater_id, id } = action.payload;
            return {
                ...state,
                subtopics_loading: false,
                subtopics: [
                    { creater_id, title, username: state.user.username, id },
                    ...state.subtopics
                ]
            };
        case CREATE_SUBTOPIC_FAILED:
            return {
                ...state,
                subtopics_loading: false,
                subtopics: [...state.subtopics],
                subtopics_error: action.payload
            };
        case SUBTOPICS_FETCHING:
            return {
                ...state,
                subtopics_loading: true,
                subtopics_error: ''
            };
        case SUBTOPICS_FETCHED:
            return {
                ...state,
                subtopics: action.payload,
                subtopics_loading: false
            };
        case SUBTOPICS_FAILED:
            return {
                ...state,
                subtopics_loading: false,
                subtopics_error: action.payload
            };
        default:
            break;
    }
}