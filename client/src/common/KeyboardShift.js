import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TextInput, UIManager } from 'react-native';

const { State: TextInputState } = TextInput;

// KeyBoardShift will handle moving the view to where the input will be located.
// This allows us to avoid covering up the input when the keyboard comes up so
// that users can see what they're typing.
const KeyBoardShift = (props) => {
    const [shift, setShift] = useState(new Animated.Value(0));

    useEffect(() => {
        const open = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        return () => open;
    }, [handleKeyboardDidShow])

    useEffect(() => {
        close = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return () => close;
    }, [handleKeyboardDidHide])

    const handleKeyboardDidShow = (e) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = e.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                shift,
                {
                    toValue: gap,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start()
        })
    }

    const handleKeyboardDidHide = () => {
        Animated.timing(
            shift, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }


    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
            {props.children}
        </Animated.View>
    );
}

export default KeyBoardShift;


const styles = StyleSheet.create({
    container: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
    }
});
