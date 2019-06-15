const local = `http://localhost:3000`;
const base_url = `https://social-app-test.herokuapp.com`;
// plase all HTTP requests in here

export const getDiscussions = async (query, dispatch) => {
    // handle loading state
    const q = new URLSearchParams({ sort: query });
    try {
        dispatch({ type: "TOP_DISCUSSIONS_FETCHING" });
        // fetch the data with query
        const response = await fetch(`${base_url}/discussions/?${q.toString()}`);
        const responseJson = await response.json();
        console.log(responseJson)
        // set the data to global state
        return dispatch({ type: "TOP_DISCUSSIONS_FETCHED", payload: responseJson });
    } catch (error) {
        // set the error to global state
        dispatch({ type: "TOP_DISCUSSIONS_FAILED", payload: error });
        throw new Error(error);
    };
};

export const getCommentsByDiscussionId = async (id, dispatch) => {
    dispatch({ type: "COMMENTS_FETCHING" })
    try {
        const response = await fetch(`${base_url}/comments/d/${id}`);
        const resJSON = await response.json();
        console.log(resJSON)
        return dispatch({ type: "COMMENTS_FETCHED_SUCCESS", payload: resJSON });
    } catch (error) {
        dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: error })
    }
}