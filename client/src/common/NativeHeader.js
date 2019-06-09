import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import NativeButton from './NativeButton'
import NativePicker from './NativePicker';


const NativeHeader = (props) => {
    return (
        <Header style={style.header}>
            <Left>
                <Button transparent>
                    <Title style={style.title}>Lambda</Title>
                </Button>
            </Left>
            <Right>
                <Button transparent>
                    <NativePicker />
                </Button>

            </Right>
        </Header>
    );
}

const style = StyleSheet.create({
    header: {
        backgroundColor: '#ffffff',
        marginBottom: 10,
        height: 70,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.49,
        elevation: 1
    },
    title: {
        color: '#BB1333'
    },
    icon: {
        color: '#BB1333'
    },
    text: {
        width: 10
    }
})

export default NativeHeader;