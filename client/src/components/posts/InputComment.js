import React, { useState, useContext } from 'react';
import { Content, Item, Input } from 'native-base';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Store } from '../../context/';

const InputComment = (props) => {
    const { state, dispatch } = useContext(Store);
    const [comment, setComment] = useState('');

    return (

        <Input
            style={styles.textInput}
            autoFocus={true}
            placeholder={`replying to ${state.comments[0].creator}`}
            onChange={(e) => setComment(e.target.value)} value={comment}
        // onSubmitEditing={}
        />

    );
}

export default InputComment;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        height: 40
    }
})