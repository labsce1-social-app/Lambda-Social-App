import React from 'react';
import style from './Style';
import { CardItem, Text, Body } from 'native-base';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

const Reply = ({ item }) => {
    return (
        <View style={style.reply_container}>
            <CardItem style={styles.cardItem}>
                <Body style={styles.body}>
                    <Text style={styles.date}>{item.username} {moment(item.created_date).fromNow()}</Text>
                    <Text>{item.post}</Text>
                </Body>
            </CardItem>
        </View >
    )
}

export default Reply;

const styles = StyleSheet.create({
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#FF5252',
        borderLeftWidth: 0.5,
        lineHeight: 30,
        paddingLeft: 20,
        marginLeft: 3
    },
    date: {
        color: '#606770',
        fontWeight: 'bold',
        fontSize: 14
    }
})