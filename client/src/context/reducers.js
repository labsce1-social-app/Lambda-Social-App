// initial state for the entire app, normally this would be split but for simplicity sake and due to the small scale of this app, this should work fine.

export const initialState = {
  top_discussions: [],
  top_discussions_loading: false,
  top_discussions_error: '',
  sortBy: 'upvotes',
  subtopics: null,
  subtopics_loading: false,
  subtopics_error: '',
  discussions: [],
  discussions_loading: false,
  discussions_error: '',
  isAuthenticated: false,
  user: null,
  comments: null,
  comments_loading: false,
  comments_error: '',
  newImage_loading: false,
  newImage: null,
  newImage_error: '',
  upvote_error: ''
};
// all of the reducer conditions, we can use the dispatch method to interact with this by simply passing in a type and sending the payload.
export const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case 'TOP_DISCUSSIONS_FETCHING':
      return {
        ...state,
        top_discussons_loading: action.payload,
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
    case 'DISCUSSIONS_FETCHING':
      return {
        ...state,
        discussions_loading: true,
        discussions_error: ''
      };
    case 'DISCUSSIONS_FETCHED':
      return {
        ...state,
        discussions: action.payload,
        discussions_loading: false
      };
    case 'DISCUSSIONS_FAILED':
      return {
        ...state,
        discussions_loading: false,
        discussions_error: action.payload
      };
    case 'COMMENTS_FETCHING':
      return {
        ...state,
        comments_loading: true,
        comments_error: ''
      };
    case 'COMMENTS_FETCHED_SUCCESS':
      console.log(state.comment)
      return {
        ...state,
        comments: action.payload,
        comments_loading: false,
        comments_error: ''
      };
    case 'COMMENTS_FETCHED_FAILED':
      return {
        ...state,
        comments: initialState.comments,
        comments_loading: false,
        comments_error: action.payload
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case 'CREATE_SUBTOPIC':
      const { title, creater_id } = action.payload;
      return {
        ...state,
        subtopics_loading: false,
        subtopics: [
          { creater_id, title, username: state.user.username },
          ...state.subtopics
        ]
      };
    case 'SENDING_IMAGE':
      return {
        newImage_loading: true,
        newImage: '',
        newImage_error: ''
      };
    case 'IMAGE_SUCCESS':
      return {
        newImage_loading: false,
        newImage: action.payload,
        newImage_error: ''
      };
    case 'IMAGE_FAILED':
      return {
        newImage_loading: false,
        newImage: '',
        newImage_error: action.payload
      };
    case 'CREATED_DISCUSSION':
      return {
        ...state,
        discussions: [...state.discussions, action.payload]
      };
    case 'CREATED_COMMENT':
      const { payload } = action;
      const { comments } = state.comments;
      return {
        ...state,
        comments: {
          ['0']: { ...state.comments['0'] },
          comments: [...comments, payload]
        },
        comments_error: '',
      };
    case 'CREATING_COMMENT_FAILED':
      return {
        ...state,
        comments_error: action.paload
      };
    case 'CREATED_REPLY':
      return {
        ...state,
        comments: {
          ['0']: { ...state.comments['0'] },
          comments: state.comments.comments.map((comment) => {
            if (action.payload.comment_id === comment.id) {
              return {
                ...comment,
                replies: [...comment.replies, action.payload]
              }
            } else {
              return comment;
            }
          })
        }
      }
    case 'USER_UPVOTED':
      return {
        ...state,
        comments: {
          ['0']: {
            ...state.comments[0],
            upvotes: (parseInt(state.comments['0'].upvotes) + 1),
            voted: true
          },
          comments: { ...state.comments }
        }
      }
    case 'USER_DOWNVOTED':
      return {
        ...state,
        comments: {
          ['0']: {
            ...state.comments[0],
            upvotes: (parseInt(state.comments['0'].upvotes) - 1),
            voted: true
          },
          comments: { ...state.comments }
        }
      }

    case 'VOTE_ACTION_FAILED':
      return {
        ...state,
        upvote_error: action.payload
      }
    default:
      throw new Error('not a valid action');
  }
};
