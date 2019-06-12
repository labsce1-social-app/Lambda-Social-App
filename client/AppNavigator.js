import React from 'react';

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';

// import ComponentName from './.'
import HomePage from './src/views/HomePage';
import Login from './src/components/auth';

/** default stack navigation **
 * Drawer and tab Navigator need custom components
 */

// render the home comopnent items
const HomeStack = createStackNavigator({
  Home: HomePage
});

const AppNavigator = createBottomTabNavigator(
  {
    // RouteName: ComponentName,
    Posts: {
      screen: HomePage, // name needs to change
      navigationOptions: {
        tabBarIcon: <Icon name="paper-plane" />
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: <Icon name="home" />
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarIcon: <Icon name="finger-print" />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#990000',
      inactiveTintColor: '#586589'
    }
  },
  {
    initialRouteName: 'Posts'
  }
);

// place navigators inside createAppContainer
export default createAppContainer(AppNavigator);
