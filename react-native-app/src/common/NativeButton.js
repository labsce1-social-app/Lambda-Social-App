import React from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';

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
Usage

import NativeButton from './src/common/Button'

for a small button
<NativeButton success>Button</NativeButton>

for a big button include block property
<NativeButton success block>Button</NativeButton>
*/