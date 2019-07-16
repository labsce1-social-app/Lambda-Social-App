import React, { useState, useContext } from 'react';
import { Icon, Picker, Form } from 'native-base';
import { Platform } from 'react-native';
import { Store } from '../../context';
import { getDiscussions } from '../../context/actions/discussionActions';

const Sort = () => {
  const { _, dispatch } = useContext(Store);
  const [selected, setSelected] = useState('upvotes');

  onValueChange = value => {
    setSelected(value);
    getDiscussions(value, dispatch);
  };
  return (
    <Form>
      <Picker
        mode="dropdown"
        iosHeader="Sort"
        iosIcon={
          <Icon
            name="arrow-dropdown"
            style={{
              color: '#007aff',
              fontSize: 25,
              width: Platform.OS === 'ios' ? undefined : '100%'
            }}
          />
        }
        selectedValue={selected}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Sort by Voted" value="upvotes" />
        <Picker.Item label="Sort by comments" value="comments" />
        <Picker.Item label="Sort by date" value="discussion.created_at" />
      </Picker>
    </Form>
  );
};

export default Sort;
