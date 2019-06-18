import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-native';
import { Store } from '../../context/';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state, dispatch } = useContext(Store);
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    state.isAuthenticated === true ? <Component {...props} /> : <Redirect
                        to="/home"
                    />
                )
            }}
        />
    )
}

export default PrivateRoute;