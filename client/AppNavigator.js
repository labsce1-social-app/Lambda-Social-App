import React from 'react';
import { Container } from 'native-base';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Home from './src/views/Home';
import Login from './src/components/auth'

const AppNavigator = (props) => {
    return (
        <NativeRouter>
            <Container>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Container>
        </NativeRouter>
    )
}


export default AppNavigator;