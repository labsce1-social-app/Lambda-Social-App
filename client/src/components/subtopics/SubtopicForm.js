import React, { useContext, useState, useEffect } from 'react';

import {
  Header,
  Container,
  Form,
  Textarea,
  Button,
  Text,
  Input,
  Item
} from 'native-base';

import { Store } from '../../context';

import { getSubtopics } from '../../utils/Requests';

const SubtopicForm = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = () => {
    getSubtopics(dispatch);
    props.navigation.navigate('Subtopics');
  };

  return (
    <Container>
      <Text>I ndeed loading</Text>
    </Container>
  );
};

export default SubtopicForm;
