import React, { useContext, useState, useEffect } from 'react';

import {
  Header,
  Content,
  Form,
  Textarea,
  Button,
  Text,
  Input,
  Item,
  View
} from 'native-base';

import { createSubtopic } from '../../context/actions/subtopics.actions';

import { Store } from '../../context';

const AddSModal = props => {
  const { state, dispatch } = useContext(Store);
  const [newTopic, setTopic] = useState('');

  const handleSubmit = dispatch => {
    createSubtopic(newTopic, state.user.id, dispatch);
    props.navigation.navigate('Load'); // TODO: change to new subtopic upon creation
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Form>
        <Item floatingLabel>
          <Input placeholder="Title" onChangeText={e => setTopic(e)} />
        </Item>
        {state.user ? (
          <Button
            danger
            onPress={() => {
              handleSubmit(dispatch);
            }}
          >
            <Text>Add Subtopic</Text>
          </Button>
        ) : (
            <Text>Log in first</Text>
          )}
      </Form>
      <Button onPress={() => props.navigation.goBack()} title="Dismiss">
        <Text>Close Modal</Text>
      </Button>
    </View>
  );
};

export default AddSModal;
