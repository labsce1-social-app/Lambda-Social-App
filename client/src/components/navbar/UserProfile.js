import React from 'react';
import { CardItem, Card, Text, Body, Thumbnail } from "native-base";
import { StyleSheet } from 'react-native';
import { isEmpty } from '../../utils/utility';

const UserProfile = ({ user, navigation }) => {
    return (
        <Card style={styles.container}>
            <CardItem header style={styles.avatar} button onPress={() => navigation.navigate('UserPage')}>
                <Thumbnail style={{ width: 50, height: 50 }} source={!isEmpty(user) ? { uri: user.avatar } : require('../../assets/useravatar.png')} />
            </CardItem>
            <CardItem>
                <Body style={styles.username}>
                    <Text >{!isEmpty(user) ? user.username : 'Anonymous Member'}</Text>
                </Body>
            </CardItem>
        </Card>
    )
}

export default UserProfile;

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    avatar: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20
    },
    username: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})