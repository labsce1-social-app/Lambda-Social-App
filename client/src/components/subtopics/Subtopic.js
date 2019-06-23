import React from 'react';
import style from './Style';
import { Content, Card, CardItem, Text, Body } from 'native-base';
import moment from 'moment'



const Subtopic = props => {
    return (
        <Card style={{ flex: 0 }}>
            <CardItem button onPress={props.changeLink}>
                <Body>
                    <Text style={style.date}>{moment(props.date).format('MMM DD YY')}</Text>
                    <Text style={style.title}>s/{props.title}</Text>
                    <Text style={style.username}>{props.name}</Text>
                </Body>
            </CardItem>
        </Card >
    )
}

export default Subtopic;