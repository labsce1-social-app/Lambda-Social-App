import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Container, Content, Body } from 'native-base';
import { config } from '../utils/dimensions';

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B70000',
        height: '100%',
    },
    img: {
        width: 200,
        height: 300,
    },
    text: {
        color: '#ffffff',
        fontSize: 24
    }
})

const Splash = () => {
    return (
        <View style={styles.body}>
            <Image style={styles.img} source={require('../assets/lambdaschool.png')} />
            <Text style={styles.text}>Welcome To Lambda Social</Text>
        </View>
    );
};

export default Splash;