import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 0
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
  reply_container: {
    flex: 0,
    padding: 2,
    marginLeft: 40
  },
  title: {
    fontSize: 18
  }
});
