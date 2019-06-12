export const initialState = {
  top_discussions: [],
  top_discussions_loading: false,
  top_discussions_error: '',
  sortBy: 'upvotes',
  subtopics: [],
  subtopics_loading: false,
  subtopics_error: '',
  access: '',
  profile: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOP_DISCUSSIONS_FETCHING':
      return {
        ...state,
        top_discussons_loading: true,
        top_discussions_error: ''
      };
    case 'TOP_DISCUSSIONS_FETCHED':
      return {
        ...state,
        top_discussons_loading: false,
        top_discussions: action.payload,
        error: ''
      };
    case 'TOP_DISCUSSIONS_FAILED':
      return {
        ...state,
        top_discussons_loading: false,
        top_discussions_error: action.payload
      };
    case 'SORT_CHANGE_SUCCESS':
      return {
        ...state,
        top_discussions_loading: false,
        sortBy: action.payload
      };
    case 'SUBTOPICS_FETCHING':
      return {
        ...state,
        subtopics_loading: true,
        subtopics_error: ''
      };
    case 'SUBTOPICS_FETCHED':
      return {
        ...state,
        subtopics: action.payload,
        subtopics_loading: false
      };
    case 'SUBTOPICS_FAILED':
      return {
        ...state,
        subtopics_loading: false,
        subtopics_error: action.payload
      };
    case 'LOGIN':
      console.log(action.payload);

      return {
        ...state,
        access: action.payload
      };
    case 'USER_INFO':
      console.log(action.payload);

      return {
        ...state,
        profile: action.payload // for now set it all into a profile object
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        error: action.payload
      };
    case 'LOGOUT':
      return { ...state, access: null, profile: null };
    default:
      return state;
  }
};
