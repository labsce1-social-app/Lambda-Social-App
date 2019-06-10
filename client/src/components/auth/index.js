import React, { useContext, useEffect } from 'react';

import { Store } from '../../context/index';

import { StyleSheet, Text, Alert, StatusBar } from 'react-native';
import { Header, Container, Right, Button, Left } from 'native-base';

// import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

import { AUTH0_CLIENT, AUTH0_DOMAIN } from 'react-native-dotenv';

// import { sendToken } from '../../redux/actions/autActions';
// import { connect } from 'react-redux';

const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

const Login = () => {
  const { state, dispatch } = useContext(Store);

  const handleLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email offline_access',
        audience: 'https://lambdasocial.auth0.com/userinfo',
        prompt: 'login'
        // responseType: 'token id_token' <- may not need
      })
      .then(credentials => {
        // console.log('creds', credentials);
        const { accessToken } = credentials;

        const decoded = jwtDecode(credentials.idToken);
        dispatch({ type: 'LOGIN', payload: { decoded, accessToken } });
        console.log(decoded); // object of all user data
      })

      .catch(error => console.log('error in login', error));
  };

  // handleLogout() {
  //   // only works for iOS
  //   auth0.webAuth
  //     .clearSession({})
  //     .then(success => {
  //       this.setState({ accessToken: null });
  //     })
  //     .catch(error => console.log(error));
  // }

  return (
    <Container>
      <Header transparent>
        <Right>
          <Button
            style={styles.AuthButton}
            title="login"
            onPress={() => handleLogin()}
          >
            <Text style={styles.buText}>Login</Text>
          </Button>
        </Right>
      </Header>

      <StatusBar backgroundColor="#ffffff" />
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  },
  AuthButton: {
    backgroundColor: '#990000'
  },
  buText: {
    color: '#ffffff',
    paddingRight: 5,
    paddingLeft: 5
  }
});
