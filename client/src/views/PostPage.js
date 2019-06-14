import React from 'react';
import Sort from '../components/discussions/Sort';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../components/posts/Post';

// this home is referring to TopDiscussions component ONLY
// currently can be used for development
const Home = props => (
    <NavWrapper>
        <Header
        >
            {props.location.path}
        </Header>
        <Sort />
        <ScrollView>
            <Post />
        </ScrollView>
    </NavWrapper>
);

export default Home;
