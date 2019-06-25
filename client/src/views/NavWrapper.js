import React, { useEffect, useState } from 'react';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';
import { Container } from 'native-base';
import { withRouter } from 'react-router-native';
import Header from '../common/Header';

// NavWrapper will be used to dynamically render the nav based on location
const NavWrapper = ({ children, history }) => {
    // we might be able to use react router to render the header name.. not sure yet.
    console.log(history)
    const [path, setPath] = useState('');
    // get all of the paths and connect them
    useEffect(() => {
        return setPath(pathHandler());
    }, [path]);

    const pathHandler = () => {
        const pathnames = []
        Object.keys(history.entries).map((item) => {
            if (history.entries[item].pathname !== '/home') {
                pathnames.push(history.entries[item].pathname)
            }

            while (pathnames.length > 2) {
                pathnames.shift();
            }
            if (pathnames[0] !== '/subtopics' && pathnames[pathnames.length - 1] === '/subtopics') {
                pathnames.shift()
            }
            if (pathnames[0] === '/subtopics') {
                pathnames.unshift('l')
            }
        })
        return pathnames.join('')
    }
    return (
        <Container>
            <NativeHeader header={history} />
            <Header text={path} />
            {children}
            <NativeFooter history={history} />
        </Container>
    )
};

export default withRouter(NavWrapper);