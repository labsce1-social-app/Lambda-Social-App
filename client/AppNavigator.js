import React from 'react';
import { Container } from 'native-base';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Home from './src/views/Home';
import Wrapper from './src/views/Wrapper';

const AppNavigator = (props) => {
    return (
        <NativeRouter>
            <Container>
                <Switch>
                    <Wrapper>
                        <Route exact path="/" component={Home} />
                    </Wrapper>
                </Switch>
            </Container>
        </NativeRouter>
    )
}


export default AppNavigator;