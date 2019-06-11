import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Store } from '../../context';
const Subtopic = lazy(() => import('./Subtopic'));
import { Text } from 'native-base';
import { BASE_URL } from 'react-native-dotenv';

//TODO: refactor to hooks
const Subtopics = () => {
    const { state, dispatch } = useContext(Store);

    useEffect(() => {
        getSubtopics();
    }, () => getSubtopics());

    const getSubtopics = async () => {
        // const url = 'http://localhost:3000'
        dispatch({ type: "SUBTOPICS_FETCHING" });
        try {
            const response = await fetch(`${BASE_URL}/subtopics`);
            const resJson = await response.json();
            console.log(resJson);
            dispatch({ type: "SUBTOPICS_FETCHED", payload: resJson });
        } catch (error) {
            dispatch({ type: "SUBTOPICS_FAILED", payload: error });
            throw new Error(error);
        }
    }

    console.log(state.subtopics)
    return (
        state.subtopics_loading === true ? <Text>Loading...</Text> : (
            <FlatList
                data={state.subtopics}
                renderItem={({ item }) => (
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <Subtopic
                            title={item.title.split(' ').join('-')}
                            name={item.username}
                            date={item.date !== item.updated ? item.updated : item.date}
                        />
                    </Suspense>
                )}
                keyExtractor={(item) => `${item.id}`}
                refreshing={state.subtopics_loading}
            />
        )
    )
}


export default Subtopics;