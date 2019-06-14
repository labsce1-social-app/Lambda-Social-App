import React from 'react';
// TODO: remove this later and place into it's own route
import Sort from '../components/discussions/Sort';
import Discussions from '../components/discussions/Discussions';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import { ScrollView } from 'react-native-gesture-handler';

// this home is referring to TopDiscussions component ONLY
// currently can be used for development
const Home = props => (
    <NavWrapper>
        <Header
        >
            s/{props.location.path}
        </Header>
        <Sort />
        <ScrollView>
            <Discussions />
        </ScrollView>
    </NavWrapper>
);

export default Home;
