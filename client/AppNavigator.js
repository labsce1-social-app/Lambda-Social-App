import React from 'react';
import { Container } from 'native-base';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import Login from './src/components/auth';
import NativeHeader from './src/components/navbar/NativeHeader';
import NativeFooter from './src/components/navbar/NativeFooter';
import DiscussionsPage from './src/views/DiscussionsPage';
import PostsPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';

const AppNavigator = (props) => {
    return (
        <NativeRouter>
            <Container>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/" component={Splash} />
                    <Route path="/login" component={Login} />
                    <Route path="/subtopics" component={SubtopicsPage} />
                    <Route path="/discussions/:id" component={DiscussionsPage} />
                    <Route path="/post/:id" component={PostsPage} />
                </Switch>
            </Container>
        </NativeRouter>
    )
}


export default AppNavigator;