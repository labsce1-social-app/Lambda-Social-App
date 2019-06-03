import React from 'react';
import { Item, Input, Label } from 'native-base';


const NativeInput = (props) => {
    return (
        <Item floatingLabel>
            <Label>{props.label}</Label>
            <Input />
        </Item>
    );
};


export default NativeInput;