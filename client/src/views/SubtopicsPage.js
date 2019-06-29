import React from 'react';
import Subtopics from '../components/subtopics/Subtopics';
import { Container } from 'native-base';

// this component will render all of the subtopics, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const SubtopicsPage = props => {
  return (
    <Container>
      <Subtopics />
    </Container>
  );
};

export default SubtopicsPage;
