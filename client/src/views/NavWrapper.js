import React from 'react';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { Container } from 'native-base';
import { withRouter } from 'react-router-native';
import Header from '../common/Header';

// NavWrapper will be used to dynamically render the nav based on location
const NavWrapper = ({ children, history, text }) => {
    // we might be able to use react router to render the header name.. not sure yet.
    console.log('history', history)
    return (
        <Container>
            <NativeHeader header={history} />
            {/* <Header text={history.location.pathname} /> */}
            <Header text={history.entries.forEach((item) => {
                return (
                    [...item.pathname].join("")
                )
            })} />
            {children}
            <NativeFooter history={history} />
        </Container>
    )
};

export default withRouter(NavWrapper);