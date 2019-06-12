import React from 'react';
import { View, Icon, StyleSheet } from 'react-native';

const style = StyleSheet = ({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

const NativeFooter = () => {
    return (
        <View style={style.container}>
            <Icon name="paper-plane" />
            <Icon name="home" />
            <Icon name="paper-plane" />
        </View>
    )
}

export default NativeFooter;