import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  post_image: {
    height: 200,
    width: '100%',
    marginBottom: 10
    // flex: 1
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        width: '90%'
      },
      android: {
      }
    })
  },
  heading: {
    fontSize: 14,
    ...Platform.select({
      ios: {
        marginRight: 10
      },
      android: {
        width: 50,
        height: 20
      }
    })
  },
  comment: {
    textAlign: 'right',
    fontSize: 10
  },
  chat: {
    marginLeft: 20
  },
  reply_container: {
    flex: 0,
    padding: 2,
    marginLeft: 40
  }
});
