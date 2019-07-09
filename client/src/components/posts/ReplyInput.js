import React, { useState, useContext, useEffect } from 'react';
import { Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';
import { addCommentReply } from '../../utils/Requests';
import { Store } from '../../context';
import { isEmpty } from '../../utils/utility';

const ReplyInput = ({ commentDetails, postId }) => {
    const { state, dispatch } = useContext(Store);
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (!isEmpty(commentDetails)) {
            const userProp = setUsername(`Replying to ${commentDetails.username}`);
            return userProp;
        }
    })

    const sendReply = () => {
        const newComment = {
            user_id: state.user.id,
            comment_post: comment,
            discussion_id: postId,
            comment_id: commentDetails.id
        }
        addCommentReply(dispatch, newComment);
        setComment('');
        setUsername('');
    }

    return (
        <Item rounded >
            <Input
                style={styles.textInput}
                autoFocus={true}
                placeholder={username}
                name="comment"
                onChangeText={(e) => setComment(e)}
                value={comment}
                onSubmitEditing={() => sendReply()}
            />
        </Item>
    );
}

export default ReplyInput;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        height: 40,
        padding: 3
    }
})