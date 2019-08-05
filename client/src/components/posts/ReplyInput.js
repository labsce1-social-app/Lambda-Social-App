import React, { useState, useContext, useEffect } from 'react';
import { Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';
import { addCommentReply } from '../../context/actions/comment.actions';
import { Store } from '../../context';
import { isEmpty } from '../../utils/utility';

const ReplyInput = ({ commentDetails, postId, hideInput, setFlagToFalse }) => {
    const { state, dispatch } = useContext(Store);
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('');

    // this useEffect fires when the original posts comment detials
    // are preset. It's main functionality is to get data for the
    // placeholder which tells the user who they're replying to.
    useEffect(() => {
        if (!isEmpty(commentDetails)) {
            const userProp = setUsername(`Replying to ${commentDetails.username}`);
            return userProp;
        }
    })

    const sendReply = () => {
        // sendReply gathers all of the details needed to make a reply
        // then submits it, empties the fields then hides the keyboard
        const newComment = {
            user_id: state.user.id,
            comment_post: comment,
            discussion_id: postId,
            comment_id: commentDetails.id,
            username: state.user.username
        }

        addCommentReply(dispatch, newComment);
        setComment('');
        setUsername('');
        hideInput();
        setFlagToFalse();
    }

    return (
        <Item rounded>
            <Input
                style={styles.textInput}
                autoFocus={true}
                placeholder={username}
                name="comment"
                onChangeText={(e) => setComment(e)}
                value={comment}
                onSubmitEditing={() => sendReply()}
                onBlur={hideInput}
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