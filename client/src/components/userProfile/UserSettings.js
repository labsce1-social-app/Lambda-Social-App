import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

const UserSettings = ({ user }) => {
    return (
        <Card>
            <CardItem>
                <Image source={{ uri: user.avatar }} />
            </CardItem>
            <CardItem>
                <Text>{user.username}</Text>
            </CardItem>
            <CardItem>
                <Text>{user.title}</Text>
            </CardItem>
            <CardItem>
                <Text>Joined {user.created_at}</Text>
            </CardItem>
        </Card>
    )
}

export default UserSettings;