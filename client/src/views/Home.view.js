import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import Discussions from '../components/discussions/Discussions';
import Sort from '../components/discussions/Sort';
import { Container, Left, Text, Card, CardItem, View } from 'native-base';
import { Image } from 'react-native';
import { Store } from '../context';
import { getDiscussions, getStats } from '../context/actions/discussion.actions';
import { isAuthed } from '../context/actions/auth.actions';
import {
  getSubtopics,
  getFavoriteSubtopics
} from '../context/actions/subtopic.actions';
import { getData } from '../utils/AsyncStorage';
import { isEmpty } from '../utils/utility';
import { theme } from '../common/theme';
import Stats from '../components/discussions/Stats';
import { ScrollView } from 'react-native-gesture-handler';

// this home is referring to TopDiscussions component ONLY

const Home = props => {
  const { state, dispatch } = useContext(Store);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats(setStats);
  }, () => getStats())

  useEffect(
    () => {
      isAuthed(dispatch);
    },
    () => isAuthed()
  );

  // gather top discussions
  useEffect(() => {
    getDiscussions(state.sortBy, dispatch);
  }, [state.sortBy]);

  // gather all subtopics
  useEffect(
    () => {
      getSubtopics(dispatch);
    },
    () => getSubtopics
  );

  // gather favorited subs
  useEffect(
    () => {
      getUserSubs(dispatch);
    },
    () => getUserSubs()
  );

  // gather favorite subtopics helper function
  const getUserSubs = async dispatch => {
    let userId = await getData('accessToken');
    if (userId === null) {
      return null;
    } else {
      userId = userId.id;
      await getFavoriteSubtopics(dispatch, userId);
    }
  };

  return (
    <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
      <ScrollView>

        <StatusBar backgroundColor="white" barStyle="dark-content" />

        <Card>
          <CardItem header>
            <Text>Welcome to neral </Text>
            <Image style={{ justifyContent: 'center', width: 30, height: 30, resizeMode: 'contain', }} source={require('../assets/LSLogo1.png')} />
            <Text> connect and inspire</Text>
          </CardItem>
          {stats && stats.map((stat, i) => {
            return (
              <Stats
                key={i}
                stats={stat}
              />
            )
          })
          }
        </Card>
        <Sort />
        <Text style={{ marginLeft: 15, marginBottom: 10 }}>See What's Trending</Text>
        <Discussions
          loading={state.top_discussions_loading}
          discussions={state.top_discussions}
        />
      </ScrollView>
    </Container >
  );
};

export default Home;
