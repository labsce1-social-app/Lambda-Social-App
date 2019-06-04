import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';

// Set up dummy image then redux method to get user image for post.

export default class App extends React.Component {
  render() {
    return <Container style={styles.container}>
      <Image style={style.icon} source={require('./my-icon.png')} />
      <Text style={style.title}>Test</Text>
    </Container>;
  }
}

const styles = StyleSheet.create({
  // Post Summary Container
  container: {
    flex: 1,
    borderWidth: 10 ,
  },
  // Post Summary Text Container for vertical stacking
  textContainer: {

  },
  line1: {

  },
  line2: {

  },
  line3: {

  },
  // Post Summary Icon
  icon: {
    height: 25,
    width: 25,
    borderWidth: 1
  },
  // Post Summary Title
  title: {

  },
  // Post Summary SubTopic Origin
  origin: {

  },
  // Post Summary Username
  username: {

  },
  // Post Summary Date
  date: {

  },
  // Post Summary Truncated Text Comment
  comment: {

  },
  // Post Summary Comment Count
  commentCount: {

  },
  // Post Summary Upvotes
  upvotes: {

  }
});