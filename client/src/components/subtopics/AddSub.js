import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../../context/';
import { Item, Label, Input, Form, Button, Text, Toast } from 'native-base';
import { View, Keyboard, Platform } from 'react-native';
import { createSubtopic } from '../../context/actions/subtopicActions';
import { isEmpty } from '../../utils/utility';

const AddSub = () => {
  const { state, dispatch } = useContext(Store);
  const [input, setInput] = useState('');

  const createSub = () => {
    Keyboard.dismiss()
    if (isEmpty(input)) {
      Toast.show({
        text: 'Title must be between 0 and 50 characters',
        buttonText: 'Okay',
        duration: 3000
      })
    }
    createSubtopic(input, state.user.id, dispatch);
    setInput('');
  };

  useEffect(() => {
    if (!isEmpty(state.subtopics_error)) {
      Toast.show({
        text: `${state.subtopics_error}`,
        buttonText: 'Okay',
        duration: 3000
      })
      setInput('')
    }
  }, [state.subtopics_error])
  return (
    <Form onSubmitEditing={() => createSub()}>
      {state.isAuthenticated === false ? (
        <Item disabled>
          <Label>Sign In To Create a Subtopic...</Label>
        </Item>
      ) : (
          <View
            style={{
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
                ...Platform.select({
                  ios: {
                    width: '100%'
                  },
                  android: {
                    width: 300,
                  }
                }),
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
                maxLength={50}
                blurOnSubmit={true}
                placeholderTextColor="grey"
                onBlur={Keyboard.dismiss}
                value={input}
                onChangeText={e => setInput(e)}
                placeholder="new Subtopic title"
              />
            </View>
            {Platform.OS === 'ios' ? null : (
              <Button
                rounded
                danger
                type="submit"
                style={{ height: 35, marginTop: 2, marginLeft: 3 }}
                onPress={() => createSub()}
              >
                <Text style={{ fontSize: 11 }}>Create</Text>
              </Button>
            )}
          </View>
        )}
    </Form>
  );
};

export default AddSub;
