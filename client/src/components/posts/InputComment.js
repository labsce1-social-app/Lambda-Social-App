import React, { useState, useContext } from 'react';
import { Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';

import { Store } from '../../context/';

const InputComment = (props) => {
    const { state, dispatch } = useContext(Store);
    const [comment, setComment] = useState('');

    return (
        <Item rounded >
            <Input
                style={styles.textInput}
                autoFocus={true}
                placeholder={`replying to ${state.comments[0].creator}`}
                onChange={(e) => setComment(e.target.value)} value={comment}
            // onSubmitEditing={}
            />
        </Item>
    );
}

export default InputComment;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        height: 40,
        padding: 3
    }
})