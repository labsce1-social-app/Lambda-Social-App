import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { StyleSheet, Image, View } from 'react-native';
import { getDiscussions } from '../components/discussions/helpers';
import { Text } from 'native-base';
import { Container } from 'native-base';
import TopDiscussions from '../components/discussions/TopDiscussions';
// TODO: remove this later and place into it's own route
import Post from '../components/posts/Post';
import Sort from '../components/discussions/Sort'
import Subtopics from '../components/subtopics/Subtopics';

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

const Home = (props) => {
    const { state, dispatch } = useContext(Store)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getDiscussions(state.sortBy, dispatch);
        setTimeout(() => {
            setLoading(false)
        }, 4000);
    }, getDiscussions());

    return (
        loading === true ? (
            <View style={styles.body}>
                <Image style={styles.img} source={require('../assets/lambdaschool.png')} />
                <Text style={styles.text}>Lambda Social</Text>
                <Image source={require('../assets/LambdaStudent.png')} />
            </View>
        ) :
            <Container>
                <Text style={{ textAlign: 'center', fontSize: 22 }}>Most Popular</Text>
                <Sort />
                {/* <TopDiscussions /> */}
                {/* <Subtopics /> */}
                <Post />
            </Container>
    );
};

export default Home;