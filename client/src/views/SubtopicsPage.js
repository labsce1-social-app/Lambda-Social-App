import React from 'react';
import Sort from '../components/discussions/Sort';
import Subtopics from '../components/subtopics/Subtopics';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import { ScrollView } from 'react-native-gesture-handler';

// this home is referring to TopDiscussions component ONLY
// currently can be used for development
const SubtopicsPage = props => (
    <NavWrapper>
        <Header
        >
            s/
    </Header>
        <Sort />
        <ScrollView>
            <Subtopics />
        </ScrollView>
    </NavWrapper>
);

export default SubtopicsPage;
