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
    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        if (!isEmpty(commentDetails)) {
            const userProp = setUsername(commentDetails.username);
            return userProp;
        }
    })

    useEffect(() => {
        if (!isEmpty(username) && isSet === false) {
            return replyConfig();
        }
    })

    const replyConfig = () => {
        setIsSet(true)
        setComment(username)
    }

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
        setIsSet(false);
    }

    const commentHandler = (e) => {
        setComment(e)
    }

    console.log(comment)
    return (
        <Item rounded >
            <Input
                style={styles.textInput}
                autoFocus={true}
                defaultValue={username}
                name="comment"
                onChangeText={(e) => commentHandler(e)}
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