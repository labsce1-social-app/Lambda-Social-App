import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Post Summary Icon
    avatar: {
        width: 48,
        height: 48,
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold'
    },
    date: {
        fontSize: 12,
        color: 'rgb(120, 120, 120)'
    },
    username: {
        fontStyle: 'italic'
    },
    comment: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 10
    },
    chat: {
        marginLeft: 20
    },
    icon: {
        width: '8%',
        height: '8%'
    },
    bubble: {
        color: 'green'
    },
    stats: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%'
    }
});
