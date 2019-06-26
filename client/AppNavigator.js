import React from 'react';
import { Container } from 'native-base';
import { Route, Switch, withRouter, BackButton } from 'react-router-native';
import Stack from 'react-router-native-stack';

import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import DiscussionsPage from './src/views/DiscussionsPage';
import PostPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';
import SubtopicForm from './src/components/subtopics/SubtopicForm';

import TopDiscussions from './src/components/discussions/TopDiscussions';

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';

// this component serves as a routing page, it will render everything based on the current url so it will be used to navigate the site.

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Post: {
    screen: PostPage
  }
});

const FooterNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: <Icon name="home" />
      }
    },
    Subtopics: {
      screen: SubtopicsPage,
      navigationOptions: {
        tabBarIcon: <Icon name="book" />
      }
    }
  },
  {
    // initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default createAppContainer(FooterNavigator);

// return (
//   <BackButton>
//     <Stack>
//       <Route exact path="/home" component={Home} />
//       <Route exact path="/" component={Splash} />
//       <Route exact path="/subtopics" component={SubtopicsPage} />
//       <Route exact path="/discussions/:id" component={DiscussionsPage} />
//       <Route exact path="/post/:id" component={PostsPage} />
//       <Route exact path="/createsubtopic" component={SubtopicForm} />
//     </Stack>
//   </BackButton>
// );
