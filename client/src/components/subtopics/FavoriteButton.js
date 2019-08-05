import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Store } from '../../context/';
import { Toast, Card, Text } from 'native-base';
import { isEmpty } from '../../utils/utility';
import {
    favoriteTheSubtopic,
    unFavoriteTheSubtopic
} from '../../context/actions/subtopic.actions';

const FavoriteButton = ({ subId }) => {
    const { state, dispatch } = useContext(Store);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        if (!isEmpty(state.favorite_subtopics)) {
            favoriteChecker()
        }
    }, [state.favorite_subtopics])

    const favoriteChecker = () => {

        state.favorite_subtopics.filter((item) => {
            if (item.id === subId) {
                setFavorited(true)
            }
        })
    }

    const isNotAuthed = () => {
        return Toast.show({
            text: "Please Sign in first",
            buttonText: 'Okay',
            duration: 3000,
        })
    }

    const favorite = async (subId, userId) => {

        const sub = {
            subtopic_id: subId,
            user_id: userId
        };
        await favoriteTheSubtopic(dispatch, sub);
        Toast.show({
            text: `Favorited!`,
            buttonText: 'Ok'
        });
        setFavorited(true)
    };

    const unFavorite = async (subId, userId) => {
        const sub = {
            subId,
            userId
        };
        await unFavoriteTheSubtopic(dispatch, sub);
        Toast.show({
            text: `un favorited :|`,
            buttonText: 'Ok'
        });
        setFavorited(false)
    };

    const contentManager = () => {
        let content;
        if (favorited === false) {
            content = (
                <TouchableOpacity
                    onPress={() => state.isAuthenticated === false ? isNotAuthed() : favorite(subId, state.user.id)}
                    style={styles().button}
                >
                    <Image source={require("../../assets/join.png")} style={{ tintColor: '#fff', flex: 1, width: 30, height: 30, resizeMode: 'contain' }} />
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Join</Text>
                </TouchableOpacity>
            )
        } else {
            content = (
                <TouchableOpacity onPress={() => state.isAuthenticated === false ? isNotAuthed() : unFavorite(subId, state.user.id)}
                    style={styles().button}>
                    <Image source={require("../../assets/join.png")} style={{ tintColor: 'yellow', flex: 1, width: 30, height: 30, resizeMode: 'contain' }} />
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }} >Leave</Text>
                </TouchableOpacity>
            )
        }
        return content;
    }

    return (
        <Card style={styles(favorited).container}>
            {contentManager()}
        </Card>)
}

export default FavoriteButton;

const styles = (favorited) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: favorited === true ? '#1976d2' : '#63a4ff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50,
        minHeight: 50,
        maxHeight: 50,
        padding: 15,
        marginBottom: 15,
        width: 125,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',

    }
})