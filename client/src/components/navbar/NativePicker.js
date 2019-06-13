import React, { useState } from "react";
import { Platform } from 'react-native';
import { Icon, Picker } from "native-base";

const NativePicker = props => {
    const [selected, setSelected] = useState(undefined);

    const onValueChange = (value) => {
        setSelected(value)
    }
    return (
        <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder=""
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: (Platform.OS === 'ios') ? undefined : 120 }}
            selectedValue={selected}
            onValueChange={() => onValueChange(value)}
        >
            <Picker.Item label="Sign Up" value="key0" />
            <Picker.Item label="UpVotes" value="key1" />
            <Picker.Item label="Recent" value="key2" />
            <Picker.Item label="Popular" value="key3" />
            <Picker.Item label="Notifications" value="key4" />
            <Picker.Item label="Suptopics" value="key5" />
            <Picker.Item label="Team" value="key6" />
        </Picker>
    );
};

export default NativePicker