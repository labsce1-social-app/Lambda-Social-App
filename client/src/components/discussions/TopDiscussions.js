import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
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
                    <Suspense fallback={<Text>Loading...</Text>}>
                    <Discussion
                        image={item.image}
                        title={item.title.split(' ').join('-')}
                        discussion={item.content}
                        name={item.username}
                        date={item.created_at}
                        comment={item.comments}
                        upvotes={item.upvotes}
                    />
                    </Suspense>
                )}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                refreshing={state.loading}
            />
        )
    )
}


export default TopDiscussions