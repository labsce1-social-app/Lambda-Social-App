/*
    example usage
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { postReducer } from './postReducer';
import { subtopicReducer } from './subtopicReducer';
export default combineReducers({
    auth: authReducer,
    post: postReducer,
    subtopic: subtopicReducer
})
*/
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

export default combineReducers({
    auth: authReducer
})