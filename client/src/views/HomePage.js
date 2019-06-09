import React from 'react';
import { Text } from 'native-base';
import Wrapper from '../components/Wrapper'
import TopDiscussions from '../components/discussions/TopDiscussions'


const HomePage = props => {
    return (
        <Wrapper>
            <Text style={{ textAlign: 'center', fontSize: 22 }}>Most Popular Discussions</Text>
            <TopDiscussions />
        </Wrapper>
    );
};

export default HomePage;