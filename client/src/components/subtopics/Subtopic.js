import React from 'react';
import style from './Style';
import { Card, CardItem, Text, Body } from 'native-base';
import moment from 'moment';

import { withNavigation } from 'react-navigation';

const Subtopic = props => {

  return (

    <Card style={{ flex: 0, height: 150 }}>
      <CardItem
        button
        onPress={() =>
          props.navigation.navigate('Discussions', {
            subId: props.id,
            title: props.title
          })
        }
      >
        <Body style={style.container}>
          <Text style={style.title}>s/{props.title}</Text>
          <Text style={style.username}>
            {props.name} &#8226; {moment(props.date).format('MMM DD YY')}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default withNavigation(Subtopic);
