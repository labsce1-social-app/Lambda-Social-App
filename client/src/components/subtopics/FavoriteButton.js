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
        if (!isEmpty(state.favorite_subtopics)) {
            favoriteChecker()
        }
    }, [state.favorite_subtopics])

    const favoriteChecker = () => {
        console.log(subId)
        // if (state.favorite_subtopics.hasOwnProperty(subId)) {
        //     setFavorited(true);
        // } else {
        //     setFavorited(false)
        // }
        state.favorite_subtopics.filter((item) => {
            if (item.id === subId) {
                setFavorited(true)
            }
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
                    onPress={() => favorite(subId, state.user.id)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'space-between' }}
                >
                    <Text>Add to Favorite</Text>
                    <Image source={require("../../assets/favorite.png")} style={{ tintColor: 'gray' }} />
                </TouchableOpacity>)
        } else {
            content = (

                <TouchableOpacity onPress={() => unFavorite(subId, state.user.id)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'space-between' }}>
                    <Text>Remove From Favorite</Text>
                    <Image source={require("../../assets/favorite.png")} style={{ tintColor: 'yellow' }} />
                </TouchableOpacity>
            )

        }
        return content;
    }

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
            {contentManager()}
        </Card>
    )
}

export default FavoriteButton;