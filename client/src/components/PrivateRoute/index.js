import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Store } from '../../context';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { state, dispatch } = useContext(Store);

  return (
    // renders a <Route /> and passes all the props through to it
    <Route
      {...rest}
      render={props =>
        // It checks if the user is authenticated
        auth.isAuthenticated === true ? (
          // if yes, it renders the "component" prop
          <Component {...props} />
        ) : (
          // if no, it redirects the user to /login
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
