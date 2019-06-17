import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Store } from '../../context/index';
import { handleAuth } from '../../utils/Requests';
import { Redirect } from 'react-router-native';

const Login = (props) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const { state, dispatch } = useContext(Store);
  const { from } = props.location.state || { from: { pathname: '/home' } }

  useEffect(() => {
    if (state.isAuthenticated === false) {
      handleAuth(dispatch, props.history)
    } else {
      setRedirectToReferrer(true);
    }
  }, [])

  if (state.isAuthenticated === true) {
    return <Redirect to={from} />
  } else {
    return <Text>Authenticating...</Text>
  }
}

export default Login