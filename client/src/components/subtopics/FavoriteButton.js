import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Store } from '../../context/';
import { Icon, Toast, Card, Text } from 'native-base';
import { isEmpty } from '../../utils/utility';
import {
    favoriteTheSubtopic,
    unFavoriteTheSubtopic
} from '../../context/actions/subtopicActions';

const FavoriteButton = ({ subId }) => {
    const { state, dispatch } = useContext(Store);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        favoriteChecker()
    }, [favorite])

    const favoriteChecker = () => {
        if (!isEmpty(state.favorite_subtopics)) {
            state.favorite_subtopics.forEach((item) => {
                if (item.id === subId) {
                    console.log("IT'S TRUEEEE")
                    return setFavorited(true)
                }
            })
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
        <Card
            style={{
                flex: 1,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 50,
                minHeight: 50,
                maxHeight: 50,
                padding: 10,
                marginBottom: 15,
                width: '60%',
            }}
        >
            {favorited === true ? (
                <TouchableOpacity
                    onPress={() => unFavorite(subId, state.user.id)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'space-between' }}
                >
                    <Text>Add to Favorite</Text>
                    <Image source={require("../../assets/favorite.png")} style={{ tintColor: 'gray' }} />
                </TouchableOpacity>
            ) : (
                    <TouchableOpacity onPress={() => favorite(subId, state.user.id)}
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'space-between' }}>
                        <Text>Remove From Favorite</Text>
                        <Image source={require("../../assets/favorite.png")} style={{ tintColor: 'yellow' }} />
                    </TouchableOpacity>
                )}
        </Card>
    )
}

export default FavoriteButton;