import React from 'react';
import { Container } from 'native-base';
import { Route, Switch, withRouter, BackButton } from 'react-router-native';
import Stack from 'react-router-native-stack';

import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import DiscussionsPage from './src/views/DiscussionsPage';
import PostsPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';
import SubtopicForm from './src/components/subtopics/SubtopicForm';

// this component serves as a routing page, it will render everything based on the current url so it will be used to navigate the site.
const AppNavigator = props => {
  return (
    <BackButton>
      <Stack>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Splash} />
        <Route exact path="/subtopics" component={SubtopicsPage} />
        <Route exact path="/discussions/:id" component={DiscussionsPage} />
        <Route exact path="/post/:id" component={PostsPage} />
        <Route exact path="/createsubtopic" component={SubtopicForm} />
      </Stack>
    </BackButton>
  );
};

export default withRouter(AppNavigator);
