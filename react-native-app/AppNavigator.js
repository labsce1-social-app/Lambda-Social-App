import React from 'react';

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';

// import ComponentName from './.'
import HomePage from './src/views/LandingPage';
import Login from './auth0/index';
import TopPosts from './src/components/postsummary/TopPosts'

/** default stack navigation **
 * Drawer and tab Navigator need custom components
 */

const AppNavigator = createBottomTabNavigator(
  {
    // RouteName: ComponentName,
    Posts: {
      screen: TopPosts, // name needs to change
      navigationOptions: {
        tabBarIcon: <Icon name="paper-plane" />
      }
    },
    Home: {
      screen: HomePage
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#990000',
      inactiveTintColor: '#586589',
      style: {
        // color: '#FFFFFF'
        // backgroundColor: '#171F33'
      }
    }
  },
  {
    initialRouteName: 'Login'
  }

);

// place navigators inside createAppContainer
export default createAppContainer(AppNavigator);
