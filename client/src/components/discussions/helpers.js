import { BASE_URL } from 'react-native-dotenv';


export const getDiscussions = async (query, dispatch) => {
    // handle loading state
    dispatch({ type: "FETCHING_DISCUSSIONS" });
    // const local = `http://localhost:3000`
    const q = new URLSearchParams({ sort: query });
    try {
        // fetch the data with query
        const response = await fetch(`${BASE_URL}/subtopics?${q.toString()}`);
        console.log(response);
        const responseJson = await response.json();
        // set the data to global state
        dispatch({ type: "DISCUSSIONS_FETCHED", payload: responseJson.splice(0, 10) });
    } catch (error) {
        // set the error to global state
        dispatch({ type: "DISCUSSIONS_FAILED", payload: error });
        throw new Error(error)
    }
}