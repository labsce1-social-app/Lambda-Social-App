import React from 'react';
import { StyleSheet, Text, View, Alert, StatusBar } from 'react-native';
import { Header, Container, Body, Right, Button } from 'native-base';

import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

import { AUTH0_CLIENT, AUTH0_DOMAIN } from 'react-native-dotenv';

const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}

export default class Login extends React.Component {
  state = {
    name: null,
    nickname: '',
    picture: '',
    sub: '' // sub is user_id
  };

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token', // id_token will return a JWT token
      scope: 'openid profile', // retrieve the user's profile
      nonce: 'nonce' // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response: ', response);

    if (response.type === 'success') {
      this.handleResponse(response.params);
    }
  };

  handleResponse = response => {
    if (response.error) {
      Alert(
        'Authentication error',
        response.error_description || 'something went wrong'
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    const { name, nickname, picture, sub } = decoded;
    this.setState({ name, nickname, picture, sub, session: response.type });
  };

  handleLogout = () => {
    AuthSession.dismiss();

    this.setState({ name: null });
  };

  static navigationOptions = {
    header: null
  };

  render() {
    const { name } = this.state;
    console.log('Logged in as:', name);

    return (
      <Container>
        <Header transparent>
          {name ? (
            <Right>
              <Button
                style={styles.AuthButton}
                title="logout"
                onPress={() => this.handleLogout()}
              >
                <Text style={styles.buText}>Log out</Text>
              </Button>
            </Right>
          ) : (
            <Right>
              <Button
                style={styles.AuthButton}
                title="login"
                onPress={this.login}
              >
                <Text style={styles.buText}>Login</Text>
              </Button>
            </Right>
          )}
        </Header>

        {/* <StatusBar backgroundColor="#ffffff" /> */}

        {name ? (
          <Text style={styles.title}>You are logged in, {name}!</Text>
        ) : (
          <Text>No one is logged in</Text>
        )}
      </Container>
    );
  }
}

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
