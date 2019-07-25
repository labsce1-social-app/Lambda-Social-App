import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

const UserSettings = ({ user }) => {
    return (
        <Card>
            <CardItem>
                <Image source={{ uri: user.avatar }} />
                <Text>{user.username}</Text>
                <Text>{user.title}</Text>
                <Text>Joined {user.created_at}</Text>
            </CardItem>
        </Card>
    )
}

export default UserSettings;