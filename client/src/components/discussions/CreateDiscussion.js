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

  const [image, setImage] = useState(null);

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

  return (
    <Container
      style={{
        // flex: 1,
        // alignContent: 'center',
        // justifyContent: 'center',
        height: '100%'
      }}
    >
      {/* <CardItem> */}
      <Content padder>
        <Form
          style={{
            flex: 1,
            alignItems: 'center',
            // justifyContent: 'space-evenly',
            width: '100%',
            height: '100%'
          }}
        >
          {/* <Text style={{ fontSize: 24 }}>Let's start a discussion.. </Text> */}
          {/* <Label>Title</Label> */}
          {/* <Item> */}
          <TextInput
            style={{ width: '100%' }}
            placeholder="title"
            onChangeText={e => setTitle(e)}
          />
          {/* </Item> */}
          {/* <Label>Tell us what your post is about...</Label> */}
          {/* <Item> */}
          <View style={{ padding: 5, flex: 1 }}>
            <TextInput
              style={{
                // width: '100%',
                height: 150,
                justifyContent: 'flex-start'
              }}
              placeholderTextColor="grey"
              numberOLines={10}
              multiline={true}
              placeholder="post is about"
              onChangeText={e => setContent(e)}
            />
          </View>
          {/* </Item> */}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 40,
              width: '80%'
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
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40
            }}
          >
            {image !== null ? (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            ) : state.newImage_loading === true ? (
              <Spinner />
            ) : null}
          </View>
        </Form>
      </Content>
      {/* </CardItem> */}
    </Container>
  );
};

export default CreateDiscussion;
