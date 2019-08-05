import React, { useContext, useState, useEffect } from 'react';
import {
  Content,
  Form,
  Button,
  View,
  Text,
  Toast,
  Spinner,
  Container,
  Icon,
  Card,
  CardItem
} from 'native-base';
import { Image, TextInput, Platform, TouchableOpacity } from 'react-native';
import {
  addDiscussion,
  uploadImage,
  removeImage
} from '../../context/actions/discussion.actions';
import { isEmpty } from '../../utils/utility';
import { Store } from '../../context';

import {
  StackActions,
  NavigationActions,
  NavigationEvents
} from 'react-navigation';

let hashtags = [];

const CreateDiscussion = props => {
  const { state, dispatch } = useContext(Store);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [image, setImage] = useState('');

  const subId = props.navigation.getParam('subId');

  useEffect(() => {
    if (image !== state.newImage) {
      return setImage(state.newImage);
    }
  });

  const submitHandler = () => {
    const tag = new RegExp(/#[a-zA-z0-9]+/gi);
    if (content.match(tag)) {
      hashtags.push(content.match(tag));
    }
    const post = {
      title,
      content: content.replace(tag, ''),
      image: image,
      creater_id: state.user.id,
      subtopic_id: subId,
      username: state.user.username,
      hashtag: hashtags
    };

    if (isEmpty(post.title) || isEmpty(post.content)) {
      return Toast.show({
        text: 'Please fill the title and content',
        buttonText: 'Okay',
        duration: 3000,
        type: 'warning'
      });
    }
    if (post.title.length > 50) {
      return Toast.show({
        text: "Title can't be longer than 50 characters",
        buttonText: 'Okay',
        duraton: 3000,
        type: 'warning'
      });
    }

    addDiscussion(post, dispatch, props.navigation);

    props.navigation.navigate('Discussions', { subId: subId });
    hashtags = [];
  };

  const handleImage = dispatch => {
    setImage('');

    removeImage(dispatch);
  };

  return (
    <Container
      style={{
        height: '100%',
        backgroundColor: '#F6F8FA', padding: 5
      }}
    >
      <NavigationEvents
        // onWillFocus={payload => console.log('will focus', payload)}
        // onDidFocus={payload => console.log('did focus', payload)}
        onWillBlur={payload => handleImage(dispatch)}
        onDidBlur={payload => handleImage(dispatch)}
      />

      <Content>
        <Card>

          <Form
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              height: '100%',
              ...Platform.select({
                ios: {
                  padding: 20
                }
              })
            }}
          >

            <CardItem
              style={{
                width: '100%',
                borderBottomColor: 'grey',
                borderBottomWidth: 0.5,
                marginBottom: 10,
                padding: 3,
                ...Platform.select({
                  ios: {
                    marginTop: 20
                  }
                })
              }}
            >
              <TextInput placeholder="Title" onChangeText={e => setTitle(e)} />
            </CardItem>

            <CardItem style={{ width: '100%', padding: 3 }}>
              <TextInput
                style={{
                  // width: '100%',
                  height: 200,
                  justifyContent: 'flex-start',
                  textAlignVertical: 'top',
                  borderColor: "#F6F8FA",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5
                }}
                placeholderTextColor="grey"
                numberOLines={10}
                multiline={true}
                placeholder="Tell us what your post is about. Use hashtags if you would like to label your post."
                onChangeText={e => setContent(e)}
              />
            </CardItem>

            <CardItem
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15
              }}
            >
              {image ? (
                <CardItem>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      padding: 6
                    }}
                    onPress={() => handleImage(dispatch)}
                  >
                    <Icon name="close" />
                  </TouchableOpacity>

                  <Image
                    source={{ uri: state.newImage }}
                    style={{ width: 400, height: 200 }}
                  />
                </CardItem>
              ) : state.newImage_loading === true ? (
                <Spinner />
              ) : null}
            </CardItem>

            <CardItem
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
                width: '80%',
                marginBottom: 0
              }}
            >
              <Button iconLeft onPress={() => uploadImage(dispatch)}>
                <Icon name="md-image" />
                <Text>Image</Text>
              </Button>

              {state.newImage_loading === true ? (
                <Button bordered light>
                  <Text>Done</Text>
                </Button>
              ) : (
                  <Button iconLeft success onPress={() => submitHandler()}>
                    <Icon name="md-checkbox-outline" />
                    <Text>Done</Text>
                  </Button>
                )}
            </CardItem>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

export default CreateDiscussion;
