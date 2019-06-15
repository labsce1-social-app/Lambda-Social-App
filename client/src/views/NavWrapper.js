import React from 'react';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { withRouter } from 'react-router-native';

// NavWrapper will be used to dynamically render the nav based on location
const NavWrapper = ({ children, history, location, match }) => {
    // we might be able to use react router to render the header name.. not sure yet.
    return (
        <>
            <NativeHeader />
            {children}
            <NativeFooter />
        </>
    )
};

export default withRouter(NavWrapper);