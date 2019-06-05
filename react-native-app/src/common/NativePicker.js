import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

class NativePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined
        };
        onValueChange = this.onValueChange.bind(this);
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    render() {
        return (

            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder=""
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange}
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
    }
}

export default NativePicker