import React, { Suspense } from 'react';
import Hashtags from './Hashtags';
import { FlatList } from 'react-native';
import { Spinner, View } from 'native-base';

const Hashtag = ({ loading, hashtags }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>

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
        </View>
    )
}

export default Hashtag;