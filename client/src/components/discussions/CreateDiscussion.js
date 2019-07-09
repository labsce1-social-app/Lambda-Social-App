import React, { useContext, useState, useEffect } from 'react';
import {
  Content,
  Form,
  Textarea,
  Button,
  Card,
  Input,
  Item,
  View,
  Label,
  CardItem,
  Text,
  Toast,
  Spinner,
  Container
} from 'native-base';
import { Image, TextInput } from 'react-native';
import { addDiscussion, uploadImage } from '../../utils/Requests';
import { isEmpty } from '../../utils/utility';
import { Store } from '../../context';

const CreateDiscussion = props => {
  const { state, dispatch } = useContext(Store);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [image, setImage] = useState('');

  const subId = props.navigation.getParam('subId');

  console.log('subtopic id for discussion', subId);

  useEffect(() => {
    if (image !== state.newImage) {
      return setImage(state.newImage);
    }
  });

  const submitHandler = () => {
    const post = {
      title,
      content,
      image: image,
      creater_id: state.user.id,
      subtopic_id: subId,
      username: state.user.username
    };

    console.log(post);
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

  // console.log('USER: ', state.user);
  // console.log('IS IT AN IMAGE? ', image);

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
            height: '100%'
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
              padding: 3
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
                textAlignVertical: 'top'
              }}
              placeholderTextColor="grey"
              numberOLines={10}
              multiline={true}
              placeholder="What is your post about..."
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
