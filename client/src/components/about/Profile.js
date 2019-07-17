import React from 'react';
import { Image } from 'react-native';
import { Card, Carditem, Thumbnail, Text, Body, Left } from 'native-base';

const Profile = (props) => {
    return (
        <Card>
            <Carditem>
                <Left>
                    <Thumbnail source={require(props.image)} />
                    <Body>
                        <Text>{props.name}</Text>
                        <Text note>{props.title}</Text>
                    </Body>
                </Left>
            </Carditem>
        </Card>
    )
}

export default Profile;