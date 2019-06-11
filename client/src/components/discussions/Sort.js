import React, { useState, useContext } from "react";
import { Icon, Left, Picker, Form } from "native-base";
import { Store } from '../../context';
import { getDiscussions } from './helpers';

const Sort = () => {
    const { _, dispatch } = useContext(Store)
    const [selected, setSelected] = useState("upvotes");

    onValueChange = (value) => {
        setSelected(value)
        getDiscussions(value, dispatch);
    };
    return (
        <Form>
            <Picker
                mode="dropdown"
                iosHeader="Sort"
                iosIcon={<Icon name="arrow-dropdown" style={{ color: "#007aff", fontSize: 25 }} />}

                selectedValue={selected}
                onValueChange={onValueChange}
            >
                <Picker.Item label="Sort by Voted" value="upvotes" />
                <Picker.Item label="Sort by comments" value="comments" />
            </Picker>
        </Form>
    );
}

export default Sort;