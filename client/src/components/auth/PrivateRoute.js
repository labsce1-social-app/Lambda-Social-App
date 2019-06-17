import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-native';
import { Store } from '../../context/';
import { handleAuth } from '../../utils/Requests';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state, dispatch } = useContext(Store);
    return (
        <Route
            {...rest}
            render={(props) => (
                state.isAuthenticated === true ? <Component {...props} /> : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                }} />
            )}
        />
    )
}

export default PrivateRoute;