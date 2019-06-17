const local = `http://localhost:3000`;
const base_url = `https://social-app-test.herokuapp.com`;
// place all HTTP requests in here


// getsDiscussions, can also take in a query string to sort the discussions, only good for top10 discussions on landing page.
export const getDiscussions = async (query, dispatch) => {
    // handle loading state
    const q = new URLSearchParams({ sort: query });
    try {
        dispatch({ type: "TOP_DISCUSSIONS_FETCHING" });
        // fetch the data with query
        const response = await fetch(`${base_url}/discussions/?${q.toString()}`);
        // convert the data to json format otherwise you will just get a promise back
        const responseJson = await response.json();
        // set the data to global state
        return dispatch({ type: "TOP_DISCUSSIONS_FETCHED", payload: responseJson });
    } catch (error) {
        // set the error to global state
        dispatch({ type: "TOP_DISCUSSIONS_FAILED", payload: error });
        // throw error
        console.log(error);
    };
};

// used for the PostPage component
// returns all comments and poster data for the comments page. Returns giant object with all post header data and arrays of comments.
export const getCommentsByDiscussionId = async (id, dispatch) => {
    // read previous function, they're almost the same
    dispatch({ type: "COMMENTS_FETCHING" })
    try {
        const response = await fetch(`${base_url}/comments/d/${id}`);
        const resJSON = await response.json();
        return dispatch({ type: "COMMENTS_FETCHED_SUCCESS", payload: resJSON });
    } catch (error) {
        dispatch({ type: 'COMMENTS_FETCHED_FAILED', payload: error })
        console.log(error)
    }
}