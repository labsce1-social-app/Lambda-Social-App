import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
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
    name: null
  };

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

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
    console.log('Authentication response', response);

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

    const { name } = decoded;
    this.setState({ name });
  };

  render() {
    const { name } = this.state;

    return (
      <View style={styles.container}>
        {name ? (
          <Text style={styles.title}>You are logged in, {name}!</Text>
        ) : (
            <Button title="Log in with Auth0" onPress={this.login} />
          )}
      </View>
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
  }
});
