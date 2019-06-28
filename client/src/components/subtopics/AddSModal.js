import React, { useContext, useState, useRef } from 'react';

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

import { createSubtopic } from '../../utils/Requests';

import { Store } from '../../context';

const AddSModal = props => {
  const { state, dispatch } = useContext(Store);
  const [newTopic, setTopic] = useState('');
  // const addSModal = useRef();

  const handleSubmit = dispatch => {
    console.log(newTopic);

    createSubtopic(newTopic, state.user.sub, dispatch);

    props.navigation.navigate('Subtopics'); // TODO: change to new subtopic upon creation
  };
  // console.log('IN SUBTOPIC FORM OUR USER: ', state.user);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text style={{ fontSize: 30 }}>This is a modal!</Text> */}
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
