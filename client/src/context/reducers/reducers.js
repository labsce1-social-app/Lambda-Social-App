import { discussionReducer, discussionState } from '../discussions/discussions.reducer';
import { authReducer, authState } from '../auth/auth.reducer';
import { commentsReducer, commentState } from '../comments/comments.reducer';
import { subtopicsReducer, subtopicState } from '../subtopics/subtopics.reducer';
import combineReducers from './combineReducer';


// exports root reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  subtopics: subtopicsReducer,
  discussions: discussionReducer
})

// exports initial state object
export const initialState = {
  discussions: discussionState,
  auth: authState,
  comments: commentState,
  subotpics: subtopicState
}
