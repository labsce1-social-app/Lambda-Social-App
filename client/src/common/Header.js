import React from 'react';
import { Text } from 'react-native';
import { Content } from 'native-base';

const Header = ({ text }) => {
    return (
        <Text
            style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 22
            }}
        >
            {text}
        </Text>
    )
}

export default Header;