import React from 'react';
import Sort from '../components/discussions/Sort';
import Subtopics from '../components/subtopics/Subtopics';
import NavWrapper from './NavWrapper';
import { ScrollView } from 'react-native-gesture-handler';

// this component will render all of the subtopics, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const SubtopicsPage = props => {

    return (
        <NavWrapper>
            <Sort />
            <ScrollView>
                <Subtopics history={props.history} />
            </ScrollView>
        </NavWrapper>
    )
};

export default SubtopicsPage;
