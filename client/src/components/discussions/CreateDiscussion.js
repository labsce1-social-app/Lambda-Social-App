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

import { createSubtopic } from '../../utils/Requests';

import { Store } from '../../context';

const CreateDiscussion = props => {
  const { state, dispatch } = useContext(Store);
  const [newTopic, setTopic] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>inside create discussions</Text>
    </View>
  );
};

export default CreateDiscussion;
