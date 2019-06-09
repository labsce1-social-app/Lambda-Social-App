import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import store from './reducers/index.js';

const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const store = createStore(Store, composeEnhancers(applyMiddleware(thunk)));

const reduxWrapper = (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};

export default reduxWrapper;