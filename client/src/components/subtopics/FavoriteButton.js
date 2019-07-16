import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Store } from '../../context/';
import { Icon, Toast } from 'native-base';
import { isEmpty } from '../../utils/utility';
import {
    favoriteTheSubtopic,
    unFavoriteTheSubtopic
} from '../../context/actions/subtopicActions';

const FavoriteButton = ({ subId }) => {
    const { state, dispatch } = useContext(Store);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        return () => {
            favoriteChecker()
        };
    }, [favorited])

    const favoriteChecker = () => {
        if (!isEmpty(state.favorite_subtopics)) {
            return state.favorite_subtopics.forEach((item) => {
                if (item.id === subId) {
                    console.log("IT'S TRUEEEE")
                    return setFavorited(true)
                }
            })
        } else {
            return setFavorited(false)
        }
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

    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-around',
                ...Platform.select({
                    ios: {
                        maxHeight: 30,
                        marginBottom: 20
                    },
                    android: {
                        maxHeight: 30,
                        marginBottom: 20
                    }
                })
            }}
        >
            {favorited === true ? (
                <TouchableOpacity onPress={() => unFavorite(subId, state.user.id)}>
                    <Icon name="close-circle" />
                </TouchableOpacity>
            ) : (
                    <TouchableOpacity onPress={() => favorite(subId, state.user.id)}>
                        <Icon name="add-circle" />
                    </TouchableOpacity>
                )}
        </View>
    )
}

export default FavoriteButton;