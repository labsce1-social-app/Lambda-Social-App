import React from 'react';
import { Container } from 'native-base';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import Login from './src/components/auth';
import Subtopics from './src/components/subtopics/Subtopics';
import Discussions from './src/components/discussions/Discussions';
import PrivateRoute from './src/components/PrivateRoute';
import NativeHeader from './src/components/navbar/NativeHeader';
import NativeFooter from './src/components/navbar/NativeFooter';

const AppNavigator = props => {
  return (
    <NativeRouter>
      <Container>
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Splash} />
          <Route path="/login" component={Login} />

          <PrivateRoute strict path="/subtopics" component={Subtopics} />
          <PrivateRoute
            strict
            path="/:subtopic_id/discussions"
            component={Discussions}
          />
        </Switch>
      </Container>
    </NativeRouter>
  );
};

export default AppNavigator;
