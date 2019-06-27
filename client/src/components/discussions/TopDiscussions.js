import React, { useContext, lazy, Suspense } from 'react';
import { withRouter } from 'react-router-native';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Discussion = lazy(() => import('./Discussion'));
import { Text, Badge } from 'native-base';
import style from './Style';

const TopDiscussions = ({ history }) => {
    const { state } = useContext(Store);

    return (
        state.top_discussions_loading === true ? <Text>Loading...</Text> : (
            <FlatList
                data={state.top_discussions}
                renderItem={({ item }) => {
                    return (
                        <Suspense fallback={<Text>Loading...</Text>}>
                            <Discussion
                                changeLink={() => history.push(`/post/${item.id}`)}
                                image={item.image}
                                title={item.title.split(' ').join('-')}
                                discussion={item.content}
                                name={item.username}
                                date={item.created_at}
                                comment={item.comments}
                                upvotes={item.upvotes}
                                hashtags={item.hashtags.map((hashtag) => (
                                    <Badge style={style.badgeColors}><Text style={style.hashtagText}>{hashtag}</Text></Badge>
                                ))}
                            />
                        </Suspense>
                    )
                }}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                refreshing={state.top_discussions_loading}
            />
        )
    )
}


export default withRouter(TopDiscussions)