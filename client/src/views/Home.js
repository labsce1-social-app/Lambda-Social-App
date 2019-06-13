import React from 'react';
import { Container, Text, Content } from 'native-base';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Post from '../components/posts/Post';
import Sort from '../components/discussions/Sort'
import Subtopics from '../components/subtopics/Subtopics';
import NavWrapper from './NavWrapper';
import { ScrollView } from 'react-native-gesture-handler';

// this home is referring to TopDiscussions component ONLY
// currently can be used for development
const Home = (props) => (
    <NavWrapper>
        <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 22
        }}>Most Popular</Text>
        <Sort />
        <ScrollView>

            <TopDiscussions />
            {/* <Subtopics /> */}
            {/* <Post /> */}
        </ScrollView>
    </NavWrapper>
)


export default Home;