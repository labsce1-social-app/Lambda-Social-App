import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { Store } from '../../context/index';
import { handleAuth } from '../../utils/Requests';
import { Redirect } from 'react-router-native';
import { Spinner, Content } from 'native-base';

const Login = (props) => {
  const { state, dispatch } = useContext(Store);
  const { from } = props.location.state || { from: { pathname: '/home' } }

  useEffect(() => {
    if (state.isAuthenticated === false) {
      return handleAuth(dispatch, props.history)
    } else {
      return <Redirect to={from} />
    }
  }, () => handleAuth())
  console.log(state.isAuthenticated);

  if (state.isAuthenticated === true) {
    return <Redirect to={from} />
  } else {
    return <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner color="blue" /></Content>
  }
}

export default Login