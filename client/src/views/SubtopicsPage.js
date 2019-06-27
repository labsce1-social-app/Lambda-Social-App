import React, { useEffect, useContext } from 'react';
import Sort from '../components/discussions/Sort';
import Subtopics from '../components/subtopics/Subtopics';
import NavWrapper from './NavWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import { getSubtopics } from '../utils/Requests';
import { Store } from '../context/';

import { Container } from 'native-base';

// this component will render all of the subtopics, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const SubtopicsPage = props => {
  const { state, dispatch } = useContext(Store);
  useEffect(
    () => {
      getSubtopics(dispatch);
    },
    () => getSubtopics()
  );
  return (
    <Container>
      <Sort />
      <ScrollView>
        <Subtopics />
      </ScrollView>
    </Container>
  );
};

export default SubtopicsPage;

//         <NavWrapper>
// </NavWrapper>
