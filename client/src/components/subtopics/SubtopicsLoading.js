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

const SubtopicsLoading = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = () => {
    getSubtopics(dispatch);
    props.navigation.navigate('Subtopics');
  };

  // TODO: Make this prettier
  return (
    <Container>
      <Text>I ndeed loading</Text>
    </Container>
  );
};

export default SubtopicsLoading;
