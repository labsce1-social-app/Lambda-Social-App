import React, { createContext, useReducer } from 'react';
import { rootReducer, initialState } from "./reducers/reducers";


// create the store with context, add state and dispatch
export const Store = createContext({ state: {}, dispatch: () => { } });

// export the provider to be wrapped around the app
export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}

