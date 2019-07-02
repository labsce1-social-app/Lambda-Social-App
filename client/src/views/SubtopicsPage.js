import React from 'react';
import Subtopics from '../components/subtopics/Subtopics';
import { Container } from 'native-base';
import AddSub from '../components/subtopics/AddSub';
// this component will render all of the subtopics, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const SubtopicsPage = props => {
  return (
    <Container style={{ backgroundColor: '#F6F8FA', padding: 5 }}>
      <AddSub />
      <Subtopics />
    </Container>
  );
};

export default SubtopicsPage;
