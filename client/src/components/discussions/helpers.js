import { BASE_URL } from 'react-native-dotenv';


export const getDiscussions = async (query, dispatch) => {
    // handle loading state
    dispatch({ type: "TOP_DISCUSSIONS_FETCHING" });
    // const local = `http://localhost:3000`
    const q = new URLSearchParams({ sort: query });
    try {
        // fetch the data with query
        const response = await fetch(`${BASE_URL}/discussions/?${q.toString()}`);
        console.log(response);
        const responseJson = await response.json();
        // set the data to global state
        dispatch({ type: "TOP_DISCUSSIONS_FETCHED", payload: responseJson.splice(0, 10) });
    } catch (error) {
        // set the error to global state
        dispatch({ type: "TOP_DISCUSSIONS_FAILED", payload: error });
        throw new Error(error)
    }
}