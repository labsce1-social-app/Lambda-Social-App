import React from 'react';
import { Text, View } from 'react-native';
import Wrapper from '../components/Wrapper'
import TopPosts from '../components/postsummary/TopPosts'


const HomePage = props => {
  return (
    <Wrapper>

      <Text>Top 10 Discussions</Text>
      {/* <Text onPress={() => props.navigation.navigate('Login')}>login</Text> */}
      <TopPosts />
    </Wrapper>
  );
};

export default HomePage;
