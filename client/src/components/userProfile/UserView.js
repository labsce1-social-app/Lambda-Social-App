import React from 'react';
import moment from 'moment';
import { Thumbnail, Card, CardItem, Text } from 'native-base';


const UserView = ({ user }) => {
    return (
        <Card>
            <CardItem header>
                <Thumbnail source={{ uri: user.avatar }} />
                <Text style={{ marginLeft: 20 }}>Name: {user.username}</Text>
            </CardItem>
            <CardItem>
                <Text>Title: {user.title ? user.title : 'No Title Yet'}</Text>
            </CardItem>
            <CardItem>
                <Text>Joined {moment(user.created_at).format('DD/MMM/YYYY')}</Text>
            </CardItem>
        </Card>
    )
}

export default UserView;