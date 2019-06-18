import React from "react";
import { Text, Button, Toast } from "native-base";

const Alert = ({ text, buttonText, type, position }) => Toast.show({
    text,
    buttonText,
    type,
    position
})


export default Alert;
