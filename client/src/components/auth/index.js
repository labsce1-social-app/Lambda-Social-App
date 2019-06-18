import React, { useContext, useEffect } from 'react';
import { Store } from '../../context/index';
import { handleAuth } from '../../utils/Requests';
import { Redirect } from 'react-router-native';
import { Spinner, Content } from 'native-base';

const Login = (props) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (state.isAuthenticated === false) {
      return handleAuth(dispatch)
    }
  }, () => handleAuth())
  console.log(state.isAuthenticated);

  if (state.isAuthenticated === false) {
    return <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner color="blue" /></Content>
  } else {
    return <Redirect to="/home" />
  }
}

export default Login
