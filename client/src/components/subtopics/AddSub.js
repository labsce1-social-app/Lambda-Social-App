import React, { useState, useContext } from 'react';
import { Store } from '../../context/';
import { Item, Label, Input, Form, Button, Text } from 'native-base';
import { createSubtopic } from '../../utils/Requests';

const AddSub = () => {
  const { state, dispatch } = useContext(Store);
  const [input, setInput] = useState('');

  const createSub = () => {
    createSubtopic(input, state.user.id, dispatch);
    setInput('');
  };
  return (
    <Form style={{ marginBottom: 15 }} onSubmitEditing={() => createSub()}>
      {state.isAuthenticated === false ? (
        <Item disabled>
          <Label>Sign In To Create a Subtopic...</Label>
        </Item>
      ) : (
        <>
          <Item floatingLabel>
            <Label>Create a Subtopic</Label>
            <Input onChangeText={e => setInput(e)} />
          </Item>
        </>
      )}
    </Form>
  );
};

export default AddSub;
