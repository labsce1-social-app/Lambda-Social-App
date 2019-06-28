import React from 'react';
import { Container, Text, Button, Icon, Image } from 'native-base';
import { Route, Switch, withRouter, BackButton } from 'react-router-native';
import Stack from 'react-router-native-stack';

import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import DiscussionsPage from './src/views/DiscussionsPage';
import PostPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';
import SubtopicsLoading from './src/components/subtopics/SubtopicsLoading';
import AddSModal from './src/components/subtopics/AddSModal';

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import DrawerContent from './src/components/navbar/DrawerContent';
import DrawerButton from './src/components/navbar/DrawerButton';
import CreateDiscussion from './src/components/discussions/CreateDiscussion';
import CreateButton from './src/components/navbar/CreateButton';

// this component serves as a routing page, it will render everything based on the current url so it will be used to navigate the site.

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.routeName}`,

      headerStyle: {
        elevation: 3 // removes shadow for android
      },

      headerLeft: <DrawerButton navigation={navigation} />
    })
  },
  Post: {
    screen: PostPage
  }
});

const SubtopicsStack = createStackNavigator(
  {
    Subtopics: {
      screen: SubtopicsPage,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.routeName}`,

        headerStyle: {
          elevation: 3 // removes shadow for android
        },

        headerLeft: <DrawerButton navigation={navigation} />
      })
    },
    Discussions: {
      screen: DiscussionsPage
    },
    Load: {
      screen: SubtopicsLoading
    },

    Modal: {
      screen: AddSModal,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Subtopic'
      })
    }
  },
  {
    mode: 'modal'
  }
);

const FooterNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: <Icon name="home" />
      }
    },
    PostADiscussion: {
      screen: CreateDiscussion,

      navigationOptions: ({ navigation }) => ({
        tabBarIcon: <CreateButton navigation={navigation} />,
        keyboardHidesTabBar: true
      })
    },
    SubTopics: {
      screen: SubtopicsStack,
      navigationOptions: {
        tabBarIcon: <Icon name="book" />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      keyboardHidesTabBar: true,

      style: {
        shadowColor: 'rgba(58,55,55,0.1)',
        shadowOpacity: 2,
        shadowRadius: 20,
        elevation: 3,
        borderTopColor: 'transparent',
        height: 52
      }
    }
  }
);

const rootDrawer = createDrawerNavigator(
  {
    Top: {
      screen: FooterNavigator
    }
  },

  {
    initialRouteName: 'Top',
    contentComponent: props => <DrawerContent {...props} />
  }
);

export default createAppContainer(rootDrawer);

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
