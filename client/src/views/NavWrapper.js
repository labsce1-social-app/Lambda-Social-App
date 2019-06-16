import React from 'react';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { Container } from 'native-base';
import { withRouter } from 'react-router-native';

// NavWrapper will be used to dynamically render the nav based on location
const NavWrapper = ({ children, history, location, match }) => {
    // we might be able to use react router to render the header name.. not sure yet.
    return (
        <Container>
            <NativeHeader />
            {children}
            <NativeFooter />
        </Container>
    )
};

export default withRouter(NavWrapper);