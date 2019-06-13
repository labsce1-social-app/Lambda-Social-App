import React, { useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Store } from '../../context';
import { getDiscussions } from '../../utils/Requests';

const styles = StyleSheet.create({
    body: {
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B70000',
        height: '100%',
    },
    img: {
        width: 200,
        height: 300,
        marginTop: 20
    },
    text: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40
    }
})

const Splash = (props) => {
    const { state, dispatch } = useContext(Store)
    useEffect(() => {
        console.log('getting data')
        getDiscussions(state.sortBy, dispatch);
        console.log('got data')
        setTimeout(() => {
            return props.history.push('/home');
        }, 4000);
    }, getDiscussions());

    return (
        <View style={styles.body}>
            <Image style={styles.img} source={require('../../assets/lambdaschool.png')} />
            <Text style={styles.text}>Lambda Social</Text>
            <Image source={require('../../assets/LambdaStudent.png')} />
        </View>
    )
}

export default Splash;