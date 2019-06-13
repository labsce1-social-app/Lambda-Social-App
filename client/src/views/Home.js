import React from 'react';
import { Container, Text } from 'native-base';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Post from '../components/posts/Post';
import Sort from '../components/discussions/Sort'
import Subtopics from '../components/subtopics/Subtopics';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { ScrollView } from 'react-native-gesture-handler';


const Home = (props) => (
    <Container>
        <NativeHeader />
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Most Popular</Text>
        <Sort />
        <ScrollView>
            <TopDiscussions />
            {/* <Subtopics /> */}
            {/* <Post /> */}
        </ScrollView>
        <NativeFooter />
    </Container>
)


export default Home;