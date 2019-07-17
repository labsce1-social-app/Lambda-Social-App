import React from 'react';
import { Text, Icon } from 'native-base';

import Home from './src/views/Home';
import DiscussionsPage from './src/views/DiscussionsPage';
import DiscussionsByHashtags from './src/views/DiscussionsByHashtags';
import PostPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';
import SubtopicsLoading from './src/components/subtopics/SubtopicsLoading';
import AddSModal from './src/components/subtopics/AddSModal';
import HashtagPage from './src/views/HashtagPage';
import AboutPage from './src/views/AboutPage';

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import DrawerContent from './src/components/navbar/DrawerContent';
import DrawerButton from './src/components/navbar/DrawerButton';
import CreateDiscussion from './src/components/discussions/CreateDiscussion';
import RecentDiscussionsPage from './src/views/RecentDiscussionsPage';
import FavoriteSubtopicsPage from './src/views/FavoriteSubtopicsPage';

// this component serves as a routing page, it will render everything based on the current url so it will be used to navigate the site.

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.routeName}`,

      headerLeft: <DrawerButton navigation={navigation} />
    })
  },

  Post: {
    screen: PostPage
  },

  Discussions: {
    screen: DiscussionsPage
  },

  FavoriteSubtopics: {
    screen: FavoriteSubtopicsPage
  },

  PostADiscussion: {
    screen: CreateDiscussion,
    navigationOptions: ({ navigation }) => ({
      title: 'Start a Discussion'
    })
  },

  AboutPage: {
    screen: AboutPage
  },
});

const SubtopicsStack = createStackNavigator({
  Subtopics: {
    screen: SubtopicsPage,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.routeName}`,

      headerLeft: <DrawerButton navigation={navigation} />
    })
  },
  Post: {
    screen: PostPage
  },

  Discussions: {
    screen: DiscussionsPage
  },

  RecentDiscussions: {
    screen: RecentDiscussionsPage
  },

  DiscussionsByHashtags: {
    screen: DiscussionsByHashtags
  },

  // FavoriteSubtopics: {
  //   screen: FavoriteSubtopicsPage
  // },

  PostADiscussion: {
    screen: CreateDiscussion,
    navigationOptions: ({ navigation }) => ({
      title: 'Start a Discussion'
    })
  }
});

const FavoritesStack = createStackNavigator({
  FavoriteSubtopics: {
    screen: FavoriteSubtopicsPage,

    navigationOptions: ({ navigation }) => ({
      title: `Favorite Subtopics`,

      headerLeft: <DrawerButton navigation={navigation} />
    })
  },
  Post: {
    screen: PostPage
  },

  Discussions: {
    screen: DiscussionsPage,
    navigationOptions: {
      tabBarVisible: false
    }
  },

  RecentDiscussions: {
    screen: RecentDiscussionsPage
  },

  DiscussionsByHashtags: {
    screen: DiscussionsByHashtags
  }
});

const Search = createStackNavigator({
  Hashtags: {
    screen: HashtagPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Search By Hashtags',
      headerLeft: <DrawerButton navigation={navigation} />
    })
  },

  Post: {
    screen: PostPage
  },

  Discussions: {
    screen: DiscussionsPage,
    navigationOptions: {
      tabBarVisible: false
    }
  },

  RecentDiscussions: {
    screen: RecentDiscussionsPage
  },

  DiscussionsByHashtags: {
    screen: DiscussionsByHashtags
  },

  PostADiscussion: {
    screen: CreateDiscussion,
    navigationOptions: ({ navigation }) => ({
      title: 'Start a Discussion'
    })
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

    SubTopics: {
      screen: SubtopicsStack,
      navigationOptions: {
        tabBarIcon: <Icon name="md-albums" />
      }
    },
    Favorited: {
      screen: FavoritesStack,
      navigationOptions: {
        tabBarIcon: <Icon name="md-star" />
      }
    },
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        // title: 'Search',
        tabBarIcon: <Icon name="md-grid" />
      })
    }
  },
  {
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#bb1333',
      // activeBackgroundColor: '#d3d3d3',
      inactiveTintColor: 'grey',
      labelStyle: {
        fontWeight: 'bold'
      },

      style: {
        // justifyContent: 'space-around',
        alignItems: 'space-around',
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
