import React, { useState } from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity, Animated
} from 'react-native';

const Reaction = ({ count, image, handlePress, voted, colorTint }) => {
    const [springValue, setSprintValue] = useState(new Animated.Value(0.3));
    const [clicked, setClicked] = useState(false)

    const _springAnimation = () => {
        if (clicked === false) {
            Animated.spring(springValue, {
                toValue: 0.35,
                friction: 1,
            }).start();
            setClicked(true)
        } else {
            Animated.spring(springValue, {
                toValue: 0.3,
                friction: 1,
            }).start();
            setClicked(false)
        }
        handlePress()
    }
    return (
        <TouchableOpacity
            onPress={_springAnimation}
            style={styles.container}
        >
            <Animated.Image
                source={image}
                style={[styles.imageView,
                { transform: [{ scale: springValue }], alignSelf: 'center', tintColor: colorTint, width: 80, height: 80 }
                ]}>
            </Animated.Image>
            <Text style={{ color: voted ? '#0064B5' : null }}>{count}</Text>
        </TouchableOpacity>
    );
}

Reaction.defaultProps = {
    handlePress: () => { },
    colorTint: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 25,
        flexDirection: 'row',
    },
    imageView: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
    }
});

export default Reaction;