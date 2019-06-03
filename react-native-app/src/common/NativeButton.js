import React from 'react';
import { Button, Text } from 'native-base';

const NativeButton = (props) => {
    return (

        <Button
            block={props.block}
            light={props.light}
            primary={props.primary}
            success={props.success}
            info={props.info}
            warning={props.warning}
            danger={props.danger}
            dark={props.dark}
        ><Text>{props.children}</Text></Button>

    );
}

export default NativeButton

/*
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

block: extend the button to cover the page

Usage

for a small button
<NativeButton success>Button</NativeButton>

for a big button include block property
<NativeButton success block>Button</NativeButton>
*/