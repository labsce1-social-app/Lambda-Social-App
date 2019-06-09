import { BASE_URL } from 'react-native-dotenv';

export const FETCHING_DISCUSSIONS = 'FETCHING_DISCUSSIONS';
export const DISCUSSIONS_FETCHED = 'DISCUSSIONS_FETCHED';
export const DISCUSSIONS_FAILED = 'DISCUSSION_FAILEDS';


// this will put token on headers for backend
export const getDiscussions = () => async dispatch => {
    const url = `${BASE_URL}/subtopics` // needs to be changed to discussions
    try {
        const res = await fetch(url);
        const resJSON = res.json();
        dispatch({ type: DISCUSSIONS_FETCHED, payload: resJSON });

    } catch (error) {
        // if any uncaught errors in login async process, dispatch an error
        dispatch({ type: DISCUSSIONS_FAILED, payload: { error: 'failed to get data' } })
    }
};