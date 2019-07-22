import { StyleSheet } from 'react-native';



export default StyleSheet.create({
    // Post Summary Icon
    avatar: {
        width: 48,
        height: 48,
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10
    },
    date: {
        fontSize: 14,
        color: 'rgb(120, 120, 120)'
    },
    username: {
        color: 'rgb(120, 120, 120)',
        fontSize: 14,
        fontStyle: 'italic',
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
        width: '60%',
        // margin: 15,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
    hashtags: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: 10,
        justifyContent: 'space-evenly',
    },
    hashtagText: {
        fontSize: 14,
        color: 'slateblue'
    }
});
