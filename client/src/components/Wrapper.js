import React from 'react';
import { Container } from 'native-base';

const Wrapper = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Wrapper;