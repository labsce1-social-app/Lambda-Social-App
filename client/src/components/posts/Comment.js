import React, { useState } from 'react';
import { CardItem, Text, Body, Right } from 'native-base';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Reply from './Reply.js';
import { isEmpty } from '../../utils/utility';
import ReplyInput from './ReplyInput';
import { withNavigation } from 'react-navigation';

const Comment = ({
    comment,
    name,
    date,
    item,
    passCommentDetails,
    postId,
    hideInput,
    isReplyingToComment,
    commentDetails,
    isAuthed,
    userId,
    navigation
}) => {
    const [isReplying, setIsReplying] = useState(false)
    // fires when reply button is pressed on a comment
    const handleReplyPress = () => {
        // retrieves comment user details about the post being replied to
        passCommentDetails()
        // flag that tells us when to open/close keyboard input
        setIsReplying(!isReplying)
    }
    return (
        <View style={styles.viewContainer}>
            <CardItem style={styles.cardItem}>
                <Body style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserViewPage', { 'userId': userId, 'userName': name })}>
                        <Text style={styles.date}>{name} {moment(date).fromNow()}</Text>
                    </TouchableOpacity>
                    <Text>{comment}</Text>
                    <Right style={{ width: '98%' }}>
                        {isAuthed === false ? null : (

                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => handleReplyPress()}
                            >
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../../assets/reply.png')}
                                />
                                <Text style={styles.reply}>Reply</Text>
                            </TouchableOpacity>
                        )
                        }
                    </Right>
                </Body>
            </CardItem>
            {!isEmpty(item) ?
                <FlatList
                    data={item}
                    renderItem={({ item }) => {
                        console.log(item)
                        return (
                            <Reply
                                item={item}
                            />
                        )
                    }}
                    // TODO: figure out how to pass the key for this
                    keyExtractor={(item, i) => `${item}-${i}`}
                />
                : null}
            {isReplying === true ? (
                <ReplyInput
                    postId={postId}
                    hideInput={hideInput}
                    isReplyingToComment={isReplyingToComment}
                    hideInput={hideInput}
                    user_id={user_id}
                    commentDetails={commentDetails}
                    setFlagToFalse={() => setIsReplying(false)}
                />
            ) : null}
        </View>
    )
}


export default withNavigation(Comment);

const styles = StyleSheet.create({
    viewContainer: {
        flex: 0,
        padding: 2,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#FF0000',
        borderLeftWidth: 0.5,
        lineHeight: 30,
        paddingLeft: 20,
        marginLeft: 3
    },
    date: {
        color: '#606770',
        fontWeight: 'bold',
        fontSize: 14
    },
    touchable: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingRight: 15
    },
    reply: {
        marginLeft: 10,
        color: '#606770',
        fontWeight: 'bold',
        fontSize: 14
    }
})