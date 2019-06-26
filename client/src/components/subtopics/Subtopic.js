import React from 'react';
import style from './Style';
import { Content, Card, CardItem, Text, Body } from 'native-base';
import { Alert } from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';

import { withNavigation } from 'react-navigation';

const Subtopic = props => {
  const swipeSettings = {
    autoClose: true,
    onClose: (secId, rowId, direction) => {},
    onOpen: (secId, rowId, direction) => {},
    right: [
      {
        onPress: () => {
          Alert.alert(
            'Alert',
            'Are you sure you want to delete this subtopic?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Yes', onPress: () => console.log('Yes Pressed') }
            ],
            { cancelable: true }
          );
        },
        text: 'Delete',
        type: 'delete'
      }
    ],
    rowId: props.id,
    sectionId: 1
  };
  return (
    <Swipeout {...swipeSettings}>
      <Card style={{ flex: 0 }}>
        <CardItem
          button
          onPress={() =>
            props.navigation.navigate('Discussions', { subId: props.id })
          }
        >
          <Body>
            <Text style={style.date}>
              {moment(props.date).format('MMM DD YY')}
            </Text>
            <Text style={style.title}>s/{props.title}</Text>
            <Text style={style.username}>{props.name}</Text>
          </Body>
        </CardItem>
      </Card>
    </Swipeout>
  );
};

export default withNavigation(Subtopic);
