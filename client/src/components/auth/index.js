import React, { useContext, useEffect } from 'react';

import { Store } from '../../context/index';

import { StyleSheet, Text, Alert, StatusBar, AsyncStorage } from 'react-native';
import { Header, Container, Right, Button, Left } from 'native-base';

// import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

import { AUTH0_CLIENT, AUTH0_DOMAIN, BASE_URL } from 'react-native-dotenv';

// import { sendToken } from '../../redux/actions/autActions';
// import { connect } from 'react-redux';

const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

const Login = () => {
  const { state, dispatch } = useContext(Store);

  const handleAuth = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email offline_access',
        audience: 'https://lambdasocial.auth0.com/userinfo',
        prompt: 'login'
      })
      .then(credentials => {
        // console.log('creds', credentials);
        const { accessToken, idToken } = credentials;

        getUser(accessToken); // send access_token

        dispatch({ type: 'LOGIN', payload: accessToken });
      })

      .catch(error => console.log('error in login', error));
  };

  // Call auth0 for user info
  getUser = token => {
    auth0.auth
      .userInfo({ token: token })
      .then(userInfo => {
        console.log('userInfo func', userInfo);

        dispatch({ type: 'USER_INFO', payload: userInfo });

        makeUser(token);
      })
      .catch(console.error);
  };

  // save that access_token similar to localstorage
  const makeUser = async token => {
    await AsyncStorage.setItem('accessToken', token);
  };

  return (
    <Container>
      <Header transparent>
        <Right>
          <Button
            style={styles.AuthButton}
            title="login"
            onPress={() => handleAuth()}
          >
            <Text style={styles.buText}>Login</Text>
          </Button>
        </Right>
      </Header>

      <Text>{state.username}</Text>
      {/* <StatusBar backgroundColor="#ffffff" /> */}

      {/* {state.profile ? <Text>{state.profile.nickname}</Text> : <Text>foo</Text>} */}
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
