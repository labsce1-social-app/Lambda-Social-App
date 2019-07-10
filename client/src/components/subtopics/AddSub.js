import React, { useState, useContext } from 'react';
import { Store } from '../../context/';
import { Item, Label, Input, Form, Button, Text } from 'native-base';
import { View } from 'react-native';
import { createSubtopic } from '../../utils/Requests';

const AddSub = () => {
  const { state, dispatch } = useContext(Store);
  const [input, setInput] = useState('');

  const createSub = () => {
    createSubtopic(input, state.user.id, dispatch);
    setInput('');
  };
  // style={{ flex: 1 }}
  return (
    <Form onSubmitEditing={() => createSub()}>
      {state.isAuthenticated === false ? (
        <Item disabled>
          <Label>Sign In To Create a Subtopic...</Label>
        </Item>
      ) : (
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 55,
            marginBottom: 20,
            padding: 8,
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: '#f1f1f1',
              borderWidth: 0.5,
              borderColor: 'grey',
              borderRadius: 6
            }}
          >
            <Input
              style={{
                padding: 5
              }}
              placeholderTextColor="grey"
              maxLength={28}
              value={input}
              onChangeText={e => setInput(e)}
              placeholder="new Subtopic title"
            />
          </View>

          <Button
            rounded
            danger
            style={{ height: 35, marginTop: 2, marginLeft: 3 }}
            onPress={() => {
              // rather than null have it show a toast
              input.length > 3 ? createSub() : null;
            }}
          >
            <Text style={{ fontSize: 11 }}>Create</Text>
          </Button>
        </View>
      )}
    </Form>
  );
};

export default AddSub;
