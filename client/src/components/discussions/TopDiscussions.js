import React, { useContext, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context'
import Discussion from './Discussion';
import { Text } from 'native-base';
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
                        comment={item.comments}
                        upvotes={item.upvotes}
                    />
                )}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                refreshing={state.loading}
            />
        )
    )
}


export default TopDiscussions