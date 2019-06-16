import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-native';
import { Store } from '../../context/';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    const { state, _ } = useContext(Store);
    return (
        <Route
            {...rest}
            render={(props) => (state.isAuthenticated === 'true' ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    )
}

export default PrivateRoute;