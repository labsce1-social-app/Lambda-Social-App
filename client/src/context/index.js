import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from "./reducers";


export const Store = createContext({ state: {}, dispatch: () => { } });

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}

