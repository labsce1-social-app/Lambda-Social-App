import React from 'react';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

const Hashtags = (props) => {
    return (
        <Button
            bordered
            success
            onPress={() => props.navigation.navigate('Discussion', {
                postId: props.id,
                title: props.title
            })}>
            <Text>{props.text}</Text>
        </Button>
    );
}

export default withNavigation(Hashtags);