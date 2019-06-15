import React from 'react';
import Sort from '../components/discussions/Sort';
import Subtopics from '../components/subtopics/Subtopics';
import NavWrapper from './NavWrapper';
import Header from '../common/Header';
import { ScrollView } from 'react-native-gesture-handler';

// this component will render all of the subtopics, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
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
