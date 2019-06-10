import React, { useReducer, createContext } from 'react';
import reducers from './reducers';

const initialState = {};
export const Store = createContext({ state: {}, dispatch: () => { } });

export const StoreProvider = props => {
    const [state, dispatch] = useReducer(reducers, initialState);
    return (
        <Store.Provider value={{ state, dispatch }}>
            {props.children}
        </Store.Provider>
    );
};