import { StyleSheet } from 'react-native';
import { config } from '../../utils/dimensions';


export default StyleSheet.create({
    container: {
        flex: 0,
        minHeight: config.deviceHeight * 0.8,
        maxHeight: config.deviceHeight * 0.8
    },
    post_image: {
        height: 200,
        width: 200,
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50
    },
    date: {
        fontSize: 12,
        color: 'rgb(120, 120, 120)'
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    comment: {
        textAlign: 'right',
        fontSize: 10
    },
    chat: {
        marginLeft: 20
    },
    bubble: {
        color: 'green'
    },
    heart: {
        color: 'red'
    },
    reply_container: {
        flex: 0,
        padding: 2,
        marginLeft: 40
    },
    reply_card: {
        flex: 1,
        flexDirection: 'row',
        width: '100%', marginBottom: 0
    },
    reply_avatar: {
        width: 40,
        height: 40,
        alignSelf: 'flex-start',
        marginRight: 5
    },
    reply_body: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
        backgroundColor: '#E9E9E9',
        padding: 10,
        borderRadius: 10
    },
    reply_buttons_container: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingRight: 15,
        marginBottom: 10
    },
    reply_date: {
        color: '#606770',
        fontWeight: 'bold',
        fontSize: 14
    },
    reply_reply_button: {
        marginLeft: 10,
        color: '#606770',
        fontWeight: 'bold',
        fontSize: 14
    }
});
