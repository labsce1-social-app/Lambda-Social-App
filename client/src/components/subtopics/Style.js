import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Post Summary Icon
    title: {
        fontWeight: 'bold',
        fontSize: 26
    },
    date: {
        fontSize: 12,
        color: 'rgb(120, 120, 120)'
    },
    username: {
        fontStyle: 'italic'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%'
    }
});
