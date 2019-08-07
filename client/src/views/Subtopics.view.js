import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { theme } from '../common/theme';
import Subtopics from '../components/subtopics/Subtopics';
import { Container } from 'native-base';
import AddSub from '../components/subtopics/AddSub';
// this component will render all of the subtopics, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const SubtopicsPage = props => {
  const { state, dispatch } = useContext(Store);
  const { subtopics: { subtopics } } = state;
  return (
    <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
      <AddSub />
      <Subtopics subtopics={subtopics} />
    </Container>
  );
};

export default SubtopicsPage;
