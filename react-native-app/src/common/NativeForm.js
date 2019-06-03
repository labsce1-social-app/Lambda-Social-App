import React from 'react';
import { Container, Content, Form } from 'native-base';

const NativeForm = (props) => {
    return (
        <Form>
            {props.children}
        </Form>
    );
}

export default NativeForm