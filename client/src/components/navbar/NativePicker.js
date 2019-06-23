import React, { useState, useContext, useEffect } from "react";
import { Store } from '../../context/';
import { Platform } from 'react-native';
import { Icon, Picker, Button } from "native-base";
import { handleLogout, handleAuth } from '../../utils/Requests';
import { withRouter } from 'react-router-native';

const NativePicker = (props) => {
    const { state, dispatch } = useContext(Store);
    const [selected, setSelected] = useState('');
    const [authed, setAuthed] = useState(null);

    useEffect(() => {
        if (state.isAuthenticated === true)
            return setAuthed(state.isAuthenticated)
    }, [])

    const onValueChange = (value) => {
        // handles user clicked login button
        if (value === '/login') {
            return handleAuth(dispatch);
        }
        // direct them to whatever other page
        setSelected(value)
        return props.history.push(value)
    }

    let content;

    if (authed === false) {
        content = (
            <Picker.Item
                label="login"
                value="/login"
            />
        )
    } else {
        content = (
            <Picker.Item
                label="Logout"
                onPress={() => handleLogout(dispatch)}
            />
        )
    }

    return (
        <Picker
            mode="dropdown"
            iosIcon={
                <Icon
                    name="arrow-down" />
            }
            placeholderStyle={{
                color: "#bfc6ea"
            }}
            placeholderIconColor="#007aff"
            style={{
                width: (Platform.OS === 'ios')
                    ? undefined : 120
            }}
            selectedValue={selected}
            onValueChange={(value) => onValueChange(value)}
        >
            <Picker.Item
                label="About Lambda Social"
                value="key0"
            />
            <Picker.Item
                label="What's NEW"
                value="/home"
            />
            <Picker.Item
                label="Suptopics"
                value="/subtopics"
            />
            <Picker.Item
                label="Team"
                value="key5"
            />
            {content}
        </Picker>
    );
};

export default withRouter(NativePicker);