import React, { useState, useContext } from "react";
import { Store } from '../../context/';
import { Platform } from 'react-native';
import { Icon, Picker, Button } from "native-base";
import { handleLogout, handleAuth } from '../../utils/Requests';
import { withRouter } from 'react-router-native';

const NativePicker = ({ history }) => {
    const { state, dispatch } = useContext(Store);
    const [selected, setSelected] = useState('');

    const onValueChange = (value) => {
        // handles user clicked login button
        if (value === 'login') {
            return handleAuth(dispatch);
        }
        // direct them to whatever other page
        setSelected(value)
        return history.push(value)
    }


    return (
        state.isAuthenticated === true ? (
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: (Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={selected}
                onValueChange={(value) => onValueChange(value)}
            >
                <Picker.Item label="About Lambda Social" value="key0" />
                <Picker.Item label="Popular" value="/home" />
                <Picker.Item label="Notifications" value="key3" />
                <Picker.Item label="Suptopics" value="/subtopics" />
                <Picker.Item label="Team" value="key5" />
                <Picker.Item label="Logout" onPress={() => handleLogout(dispatch)} />
            </Picker>
        ) : (
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder=""
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: (Platform.OS === 'ios') ? undefined : 120 }}
                    selectedValue={selected}
                    onValueChange={(value) => onValueChange(value)}
                >
                    <Picker.Item label="About Lambda Social" value="key0" />
                    <Picker.Item label="Popular" value="/home" />
                    <Picker.Item label="Suptopics" value="/subtopics" />
                    <Picker.Item label="Team" value="key5" />

                    <Picker.Item label="login" value="login" />
                </Picker>
            )

    );
};

export default withRouter(NativePicker);