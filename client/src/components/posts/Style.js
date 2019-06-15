import { StyleSheet } from 'react-native';
import { StyleSheet } from 'react-native';
import { config } from '../../utils/dimensions';


export default StyleSheet.create({
    container: {
        flex: 0,
        minHeight: config.deviceHeight * 0.75,
        maxHeight: config.deviceHeight * 0.75
    },
    post_image: {
        height: 200,
        width: 200,
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50
    }
});
