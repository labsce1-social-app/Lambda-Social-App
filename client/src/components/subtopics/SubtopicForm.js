import React, { useContext, useState } from 'react';

import {
  Header,
  Content,
  Form,
  Textarea,
  Button,
  Text,
  Input,
  Item
} from 'native-base';

import { createSubtopic } from '../../utils/Requests';

import { Store } from '../../context';
// import NavWrapper from '../../views/NavWrapper';

const SubtopicForm = ({ history }) => {
  const { state, dispatch } = useContext(Store);
  const [newTopic, setTopic] = useState('');

  // const onChange = e => {
  //   // console.log('INSIDE ONCHANGE', e);
  //   setTopic(e);
  // };

  const handleSubmit = dispatch => {
    console.log(newTopic);

    createSubtopic(newTopic, state.user.sub, dispatch);

    history.push('/subtopics'); // change to new subtopic upon creation
  };
  // console.log('IN SUBTOPIC FORM OUR USER: ', state.user);

  return (
    <Content>
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
    </Content>
  );
};

export default SubtopicForm;