import React from 'react';
import { Button, Icon, Text } from 'native-base';
import { StyleSheet } from 'react-native';


const IconButton = (props) => {
    return (
        <Button
            iconLeft={props.iconLeft}
            iconRight={props.iconRight}
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
        >
            <Icon name={props.name} />
            <Text>{props.children}</Text>
        </Button>

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