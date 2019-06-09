import React from 'react';
import { Text } from 'native-base';
import Wrapper from '../components/Wrapper'
import TopPosts from '../components/discussions/TopPosts'


const HomePage = props => {
    return (
        <Wrapper>
            <Text style={{ textAlign: 'center', fontSize: 22 }}>Most Popular Discussions</Text>
            <TopPosts />
        </Wrapper>
    );
};

export default HomePage;