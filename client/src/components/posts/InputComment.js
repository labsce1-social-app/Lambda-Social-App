import React, { useState, useContext } from 'react';
import { Content, Item, Input, Form } from 'native-base';
import { Store } from '../../context/';

const InputComment = (props) => {
    const { state, dispatch } = useContext(Store);
    const [comment, setComment] = useState('');

    return (
        <Content style={{ marginBottom: 10 }}>
            <Form
            // TODO: need to add submit handling to comment reply
            // onSubmit={}
            >
                <Item>
                    <Input
                        placeholder={`replying to ${state.comments[0].creator}`}
                        onChange={(e) => setComment(e.target.value)} value={comment}
                    />
                </Item>
            </Form>
        </Content>
    );
}

export default InputComment;