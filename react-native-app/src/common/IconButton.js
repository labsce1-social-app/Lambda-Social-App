import React, { Component } from 'react';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';


const IconButton = (props) => {
    return (
        <Button
            iconLeft={props.iconLeft}
            iconRight={props.iconRight}
            transparent={props.transparent}
        >
            <Icon name={props.iconName} />
            <Text>{props.children}</Text>
        </Button>

    );
}

export default IconButton