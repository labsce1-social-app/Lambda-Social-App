import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context'
import Discussion from './Discussion';
import { Text } from 'native-base';
import { BASE_URL } from 'react-native-dotenv';
import { getDiscussions } from './helpers';


//TODO: refactor to hooks
const TopDiscussions = () => {
    const { state, dispatch } = useContext(Store);

    useEffect(() => {
        getDiscussions(state.sortBy, dispatch);
    }, () => getDiscussions());



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