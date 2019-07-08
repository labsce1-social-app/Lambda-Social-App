import React, { useState, useContext } from 'react';
import { Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';
import { addComment } from '../../utils/Requests';
import { Store } from '../../context/';

const InputComment = (props) => {
    const { state, dispatch } = useContext(Store);
    const [comment, setComment] = useState('');
    console.log(comment)
    const sendComment = () => {
        const newComment = {
            user_id: state.user.id,
            comment_post: comment,
            discussion_id: props.postId
        }
        addComment(dispatch, newComment)
        setComment('')
    }

    return (
        <Item rounded >
            <Input
                style={styles.textInput}
                autoFocus={true}
                placeholder={`replying to ${state.comments[0].creator}`}
                onChangeText={(e) => setComment(e)}
                value={comment}
                onSubmitEditing={() => sendComment()}
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