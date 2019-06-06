import { Dimensions } from 'react-native';

// this will get dimensions of current device
// can be used to keep styles responsive
export const config = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height
}

/*
const styles = StyleSheet.create({
    constainer: {
        paddingLeft: config.deviceWidth * 0.1,
        width: config.deviceWidth * 0.8
    }
}) */