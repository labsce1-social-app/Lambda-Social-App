export function combineReducers(reducers) {
    // First get an array with all the keys of the reducers
    const reducerKeys = Object.keys(reducers);

    return function combination(state = {}, action) {
        // this is the object we are going to return.
        const nextState = {};

        // Loop through all of the reducer keys
        for (let i in reducerKeys.length) {
            const key = reducerKeys[i];
            // Get the current reducer
            const reducer = reducers[key];
            // Get the prevState
            const previousStateForKey = state[key];
            // Get the next state by running the reducer
            const nextStateForKey = reducer(previousStateForKey, action);
            // Update the new state for the current reducer
            nextState[key] = nextStateForKey;
        }
        return nextState;
    }
}