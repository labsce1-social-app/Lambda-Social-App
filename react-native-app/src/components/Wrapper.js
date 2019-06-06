import React from 'react';
import { Container, Content } from 'native-base';

const Wrapper = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Wrapper