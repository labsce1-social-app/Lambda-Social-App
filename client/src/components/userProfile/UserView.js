import React from 'react';
import moment from 'moment';
import { Thumbnail, Card, CardItem, Text, Spinner } from 'native-base';
import { isEmpty } from '../../utils/utility';

const UserView = ({ user }) => {
    return !isEmpty(user) ?
        (
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
            </Card>)
        : <Spinner />

}

export default UserView;