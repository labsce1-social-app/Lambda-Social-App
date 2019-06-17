import React from 'react';
import { Container } from 'native-base';
import { NativeRouter, Route } from 'react-router-native';
import Splash from './src/components/splash/Splash';
import Home from './src/views/Home';
import Login from './src/components/auth';
import DiscussionsPage from './src/views/DiscussionsPage';
import PostsPage from './src/views/PostPage';
import SubtopicsPage from './src/views/SubtopicsPage';
import Stack from 'react-router-native-stack';
import PrivateRoute from './src/components/auth';


// this component serves as a routing page, it will render everything based on the current url so it will be used to navigate the site.

const AppNavigator = (props) => {
    return (
        <NativeRouter>
            <Container>
                <Stack>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/" component={Splash} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/subtopics" component={SubtopicsPage} />
                    <PrivateRoute exact path="/discussions/:id" component={DiscussionsPage} />
                    <PrivateRoute exact path="/post/:id" component={PostsPage} />
                </Stack>
            </Container>
        </NativeRouter>
    )
}


export default AppNavigator;