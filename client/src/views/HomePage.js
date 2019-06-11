import React from 'react';
import { Text } from 'native-base';
import Wrapper from '../components/Wrapper';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Post from '../components/posts/Post';
import Sort from '../components/discussions/Sort'


const HomePage = props => {
    return (
        <Wrapper>
            <Text style={{ textAlign: 'center', fontSize: 22 }}>Most Popular Discussions</Text>
            <Sort />
            <TopDiscussions />
            {/* <Post /> */}
        </Wrapper>
    );
};

export default HomePage;