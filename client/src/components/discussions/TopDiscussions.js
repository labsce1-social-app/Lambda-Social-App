import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context'
import Discussion from './Discussion';
import { Text } from 'native-base';
import { BASE_URL } from 'react-native-dotenv';


//TODO: refactor to hooks
const TopDiscussions = () => {
    const { state, dispatch } = useContext(Store);

    useEffect(() => {
        getDiscussions()
    }, () => getDiscussions());

    const getDiscussions = async (query = "upvotes") => {
        // handle loading state
        const local = `http://localhost:3000`
        const q = new URLSearchParams({ sort: query });
        dispatch({ type: "FETCHING_DISCUSSIONS" });
        try {
            // fetch the data
            let response = await fetch(`${local}/subtopics?${q.toString()}`);
            console.log(response);
            let responseJson = await response.json();
            // set the data to global state
            dispatch({ type: "DISCUSSIONS_FETCHED", payload: responseJson.splice(0, 10) });
        } catch (error) {
            // set the error to global state
            dispatch({ type: "DISCUSSIONS_FAILED", payload: error });
        }
    }

    return (
        state.loading === true ? <Text>Loading...</Text> : (
            <FlatList
                data={state.discussions}
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
                refreshing={this.refresh}
                onRefresh={() => this.toRefresh}
            />
        )
    )
}


export default TopDiscussions