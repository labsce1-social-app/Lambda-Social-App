import React, { useContext, lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-native';
import { FlatList } from 'react-native';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
import { Text, Badge, Spinner } from 'native-base';
import style from './Style';
import { getDiscussions, isAuthed } from '../../utils/Requests';

const TopDiscussions = props => {
    const { state, dispatch } = useContext(Store);
    // useEffect(() => {
    //     isAuthed();
    // }, () => isAuthed())

    // useEffect(() => {
    //     getDiscussions(state.sortBy, dispatch);
    // }, []);

    return (
        state.top_discussions &&
        <FlatList
            data={state.top_discussions}
            renderItem={({ item }) => {
                item.title
                return (
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <Discussion
                            id={item.id}
                            image={item.image}
                            title={item.title.split(' ').join('-')}
                            discussion={item.content}
                            name={item.username}
                            date={item.created_at}
                            comment={item.comments}
                            upvotes={item.upvotes}
                            hashtags={item.hashtags && item.hashtags.map((hashtag, index) => (
                                <Badge key={`hashtag-${hashtag[0]}-${index}`} style={style.badgeColors}>
                                    <Text style={style.hashtagText}>
                                        {hashtag}
                                    </Text>
                                </Badge>
                            ))}
                        />
                    </Suspense>
                );
            }}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            refreshing={state.top_discussions_loading}
        />
    );
};

export default TopDiscussions;
