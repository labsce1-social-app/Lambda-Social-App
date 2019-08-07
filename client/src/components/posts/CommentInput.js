import React, { useState, useContext } from 'react';
import { Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';
import { addComment } from '../../context/comments/comments.actions';
import { Store } from '../../context';

const CommentInput = (props) => {
    const { state, dispatch } = useContext(Store);
    const [comment, setComment] = useState('');
    const { auth: { user }, comments: { comments } } = state;
    const sendComment = () => {
        const newComment = {
            user_id: user.id,
            comment_post: comment,
            discussion_id: props.postId,
            username: user.username
        }
        addComment(dispatch, newComment)
        setComment('')
        props.hideInput()
    }

    return (
        <Item rounded >
            <Input
                onBlur={props.setIsReplying}
                style={styles.textInput}
                autoFocus={true}
                placeholder={`replying to ${comments[0].creator}`}
                onChangeText={(e) => setComment(e)}
                value={comment}
                onSubmitEditing={() => sendComment()}
            />
        </Item>
    );
}

export default CommentInput;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        height: 40,
        padding: 3
    }
})