import React from 'react';
import { Button, Icon, Text } from 'native-base';


const IconButton = (props) => {
    return (
        <Button
            iconLeft={props.iconLeft}
            iconRight={props.iconRight}
            transparent={props.transparent}
            light={props.light}
            primary={props.primary}
            success={props.success}
            info={props.info}
            warning={props.warning}
            danger={props.danger}
            dark={props.dark}
        >
            <Icon name={props.name} />
            <Text>{props.children}</Text>
        </Button>

    );
}

export default IconButton

/*
usage
<IconButton primary iconLeft name="arrow-back">Button</IconButton>
options
colors {
    primary: blue,
    success: green
    light: lightgrey,
    info: lightblue,
    warning: yellow,
    danger: red
    dark: darkgrey
}
not the full list yet
icons ['arrow-back', 'arrow-forward', 'home', 'beer', 'cog', ]
*/