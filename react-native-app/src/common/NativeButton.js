import React from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

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
            transparent={props.transparent}
            style={styles.shadow}
            bordered={props.bordered}
        ><Text>{props.children}</Text></Button>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.49,
        elevation: 1
    }
})

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