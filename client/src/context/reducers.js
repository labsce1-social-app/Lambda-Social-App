
export const initialState = {
    discussions: [],
    loading: false,
    error: '',
    sortBy: 'upvotes'
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
        case "SORT_CHANGE_STARTED":
            return {
                ...state,
                loading: true,
            }
        case "SORT_CHANGE_SUCCESS":
            return {
                ...state,
                loading: false,
                sortBy: action.payload
            }
        case "SORT_CHANGE_FAILED":
            return {
                ...state,
                loading: false,
                softBy: initialState.sortBy,
                error: action.payload
            }
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}