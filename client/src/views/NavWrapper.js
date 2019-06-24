import React, { useEffect, useState } from 'react';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { Container } from 'native-base';
import { withRouter } from 'react-router-native';
import Header from '../common/Header';

// NavWrapper will be used to dynamically render the nav based on location
const NavWrapper = ({ children, history, text }) => {
    // we might be able to use react router to render the header name.. not sure yet.
    // const [path, setPath] = useState('');
    // // get all of the paths and connect them
    // useEffect(() => {
    //     return pathHandler();
    // }, [history])

    // const pathHandler = () => {
    //     Object.keys(history.entries).map((item) => {
    //         const pathnames = new Set()
    //         if (history.entries[item].pathname !== '/home') {
    //             pathnames.add(history.entries[item].pathname)
    //         }
    //         if ('id' === undefined) {
    //             return setPath("fuck it")
    //         }
    //         return setPath([...pathnames].join('')) || ''
    //     })
    // }
    return (
        <Container>
            <NativeHeader header={history} />
            {/* <Header text={history.location.pathname} /> */}
            {/* <Header text={path} /> */}
            {children}
            <NativeFooter history={history} />
        </Container>
    )
};

export default withRouter(NavWrapper);