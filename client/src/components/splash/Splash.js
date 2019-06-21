import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-native';
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

// splash screen is used when the app first loads, I need to find a better way to render this so that it isn't an actual part of the app. Current way of doing this is hacky and presents bugs.
const Splash = (props) => {
    const { state, dispatch } = useContext(Store)
    useEffect(() => {
        getDiscussions(state.sortBy, dispatch);
    }, []);

    return state.splash === true ? (
        <View style={styles.body}>
            <Image style={styles.img} source={require('../../assets/lambdaschool.png')} />
            <Text style={styles.text}>Lambda Social</Text>
            <Image source={require('../../assets/LambdaStudent.png')} />
        </View>
    ) : <Redirect to="/home" />
}

export default Splash;