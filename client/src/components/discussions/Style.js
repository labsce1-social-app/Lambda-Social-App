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
        width: '100%',
        fontWeight: 'bold',
        fontSize: 14
    },
    chat: {
        marginLeft: 20
    },
    icon: {
        width: 8,
        height: 8
    },
    bubble: {
    },
    stats: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '70%',
        margin: 10,
        alignSelf: 'flex-end'
    }
});
