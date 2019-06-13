import React from 'react';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { withRouter } from 'react-router-native';

// NavWrapper will be used to dynamically render the nav based on location
const NavWrapper = ({ children, history, location, match }) => {
    // console.log('history: ', history);
    // console.log('location: ', location)
    // console.log('match: ', match)
    return (
        <>
            <NativeHeader />
            {children}
            <NativeFooter />
        </>
    )
};

export default withRouter(NavWrapper);