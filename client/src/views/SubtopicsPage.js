import React, { useEffect, useContext } from 'react';
import Subtopics from '../components/subtopics/Subtopics';
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
      <Subtopics />
    </Container>
  );
};

export default SubtopicsPage;
