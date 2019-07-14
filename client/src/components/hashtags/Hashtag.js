import React from 'react';
import { Button, Text, Card } from 'native-base';
import { FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';

const Hashtag = (props) => {
    return (
        <Card style={{ padding: 10, backgroundColor: '#FFFFFF' }}>
            <FlatList
                horizontal={false}
                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                numColumns={3}
                keyExtractor={item => item.hashtag}
                refreshing={props.loading}
                data={props.hashtags}
                renderItem={({ item }) => (
                    <Button
                        style={{ margin: 10, alignSelf: null }}
                        bordered
                        // style={{ alignSelf: null, width: '100%' }}
                        onPress={() => props.navigation.navigate('DiscussionsByHashtags', {
                            hashtag: item.hashtag,
                            title: item.hashtag
                        })}>
                        <Text>{item.hashtag}</Text>
                    </Button>
                )} />
        </Card>
    )
}

export default withNavigation(Hashtag);