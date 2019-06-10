import React, { useContext, useEffect } from 'react';
import { Store } from '../../context/';
import { FlatList } from 'react-native-gesture-handler';
import Discussion from './Discussion';
import { BASE_URL } from 'react-native-dotenv';
import { Text } from 'native-base';

const url = `${BASE_URL}/subtopics`;

//TODO: refactor to hooks
const TopDiscussions = () => {
    const { state, dispatch } = useContext(Store);
    const { discussions, loading, error } = state;

    useEffect(() => {
        fetchData()
    }, () => fetchData());

    const fetchData = async () => {
        // handle loading state
        dispatch({ type: "FETCHING_DISCUSSIONS" });
        try {
            // fetch the data
            let response = await fetch(url);
            let responseJson = await response.json();
            // set the data to global state
            return dispatch({ type: "DISCUSSIONS_FETCHED", payload: responseJson });
        } catch (error) {
            // set the error to global state
            return dispatch({ type: DISCUSSIONS_FAILED, payload: error });
        }
    }

    return (
        <FlatList
            data={discussions}
            renderItem={({ item }) => (
                <Discussion
                    image={item.image}
                    title={item.title.split(' ').join('-')}
                    discussion={item.content}
                    name={item.username}
                    date={item.created_at}
                    comment={'2'}
                />
            )}
            keyExtractor={this._keyExtractor}
        // refreshing={refresh}
        // onRefresh={() => toRefresh}
        />
    )
}


export default TopDiscussions