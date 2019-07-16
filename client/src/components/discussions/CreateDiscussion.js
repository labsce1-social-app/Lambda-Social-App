import React, { useContext, useState, useEffect } from 'react';
import {
  Content,
  Form,
  Button,
  View,
  Text,
  Toast,
  Spinner,
  Container
} from 'native-base';
import { Image, TextInput, Platform } from 'react-native';
import { addDiscussion, uploadImage } from '../../context/actions/discussionActions';
import { isEmpty } from '../../utils/utility';
import { Store } from '../../context';

const hashtags = [];

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
    if (content.match(/#[a-zA-z]+/gi)) {
      hashtags.push(content.match(/#[a-zA-z]+/gi));
    }
    const post = {
      title,
      content: content.replace(/#[a-zA-z]+/gi, ''),
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
  };


  return (
    <Container
      style={{
        height: '100%'
      }}
    >
      <Content>
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
              width: '80%',
              marginBottom: 0
            }}
          >
            <Button bordered onPress={() => uploadImage(dispatch)}>
              <Text>Upload an image</Text>
            </Button>

            {state.newImage_loading === true ? (
              <Button bordered light>
                <Text>Done</Text>
              </Button>
            ) : (
                <Button bordered success onPress={() => submitHandler()}>
                  <Text>Done</Text>
                </Button>
              )}
          </View>

          <View
            style={{
              width: '100%',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.5,
              marginBottom: 10,
              padding: 3,
              ...Platform.select({
                ios: {
                  marginTop: 20,
                }
              })
            }}
          >
            <TextInput placeholder="Title" onChangeText={e => setTitle(e)} />
          </View>

          <View style={{ width: '100%', padding: 3 }}>
            <TextInput
              style={{
                // width: '100%',
                height: 200,
                justifyContent: 'flex-start',
                textAlignVertical: 'top',

              }}
              placeholderTextColor="grey"
              numberOLines={10}
              multiline={true}
              placeholder="Tell us what your post is about. Use hashtags if you would like to label your post."
              onChangeText={e => setContent(e)}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            ) : state.newImage_loading === true ? (
              <Spinner />
            ) : (
                  <Text>Add an image</Text>
                )}
          </View>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateDiscussion;
