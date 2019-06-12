import React from 'react';
import { View } from 'react-native';
import NativeHeader from '../components/navbar/NativeHeader';
import NativeFooter from '../components/navbar/NativeFooter';

const Wrapper = ({ children }) => {
    return (
        <View>
            <NativeHeader />
            {children}
            <NativeFooter />
        </View>
    )
}

export default Wrapper;