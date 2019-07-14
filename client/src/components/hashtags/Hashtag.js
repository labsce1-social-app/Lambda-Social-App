import React, { Suspense } from 'react';
import Hashtags from './Hashtags';
import { FlatList } from 'react-native';
import Discussions from '../discussions/Discussions';
import { Spinner } from 'native-base';

const Hashtag = ({ loading, hashtags }) => {
    return (
        <FlatList
            keyExtractor={item => item}
            refreshing={loading}
            data={hashtags}
            renderItem={({ item }) => (
                <Suspense fallback={<Spinner />}>
                    <Hashtags
                        id={item.hashtag}
                        text={item.hashtag}
                    />
                </Suspense>
            )} />
    )
}

export default Hashtag;