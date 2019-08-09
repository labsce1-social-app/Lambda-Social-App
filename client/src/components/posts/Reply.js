import React from 'react';
import style from './Style';
import { CardItem, Text, Body } from 'native-base';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

const Reply = ({ item, navigation }) => {
    return (
        <View style={style.reply_container}>
            <CardItem style={styles.cardItem}>
                <Body style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserViewPage', {
                        'userId': item.user_id, 'userName': item.username
                    })}>
                        <Text style={styles.date}>{item.username} {moment(item.created_date).fromNow()}</Text>
                    </TouchableOpacity>
                    <Text>{item.comment_post}</Text>
                </Body>
            </CardItem>
        </View>
    )
}

export default withNavigation(Reply);

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