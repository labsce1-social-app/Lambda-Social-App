import React from 'react';
import { Container, Text } from 'native-base';
import { Route, Switch, withRouter, BackButton } from 'react-router-native';
import Stack from 'react-router-native-stack';

import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import DiscussionsPage from './src/views/DiscussionsPage';
import PostPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';
import SubtopicForm from './src/components/subtopics/SubtopicForm';
import AddSModal from './src/components/subtopics/AddSModal';

import TopDiscussions from './src/components/discussions/TopDiscussions';

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';

import DrawerContent from './src/components/navbar/DrawerContent';

// this component serves as a routing page, it will render everything based on the current url so it will be used to navigate the site.

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.routeName}`,

      headerStyle: {
        elevation: 0 // removes shadow for android
      },

      headerLeft: (
        <Text // toggles drawer
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          LAMBDA
        </Text>
      )
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
          elevation: 0 // removes shadow for android
        },

        headerLeft: (
          <Text // toggles drawer
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            LAMBDA
          </Text>
        )
      })
    },
    Discussions: {
      screen: DiscussionsPage
    },

    Modal: {
      screen: AddSModal
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const FooterNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: <Icon name="home" />
    }
  },
  SubTopics: {
    screen: SubtopicsStack,
    navigationOptions: {
      tabBarIcon: <Icon name="book" />
    }
  }
});

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
