import React, { useContext, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
import { Text } from 'native-base';

const TopDiscussions = () => {
    const { state } = useContext(Store);

    return (
        state.top_discussions_loading === true ? <Text>Loading...</Text> : (
            <FlatList
                data={state.top_discussions}
                renderItem={({ item }) => (
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <Discussion
                            link={item.id}
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
                refreshing={state.top_discussions_loading}
            />
        )
    )
}


export default TopDiscussions