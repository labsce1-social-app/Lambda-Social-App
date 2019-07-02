import React, { useContext, useState } from 'react';
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
  Toast
} from 'native-base';
import { addDiscussion, uploadImage } from '../../utils/Requests';
import { isEmpty } from '../../utils/utility';
import { Store } from '../../context';

const CreateDiscussion = props => {
  const { state, dispatch } = useContext(Store);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const subId = props.navigation.getParam('subId');

  const submitHandler = () => {
    if (isEmpty(title) || isEmpty(conent)) {
      return Toast.show({
        text: "Please fill the title and content",
        buttonText: "Okay",
        duration: 3000,
        type: 'warning'
      })
    }
    const newDiscussion = {
      title, content, image
    }
    return addDiscussion(newDiscussion, subId)
  }

  return (
    <Card style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <CardItem >
        <Content>
          <Form style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', width: '100%', height: 400 }}>
            <Text style={{ fontSize: 24 }}>Let's start a discussion.. </Text>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input onChangeText={(e) => setTitle(e)} />
            </Item>
            <Item floatingLabel>
              <Label>Tell us what your post is about...</Label>
              <Textarea style={{ width: '100%' }} rowSpan={5} bordered onChangeText={(e) => setContent(e)} />
            </Item>
            {!isEmpty(image) ? <Image source={{ uri: image }} style={{ width: '100%' }} /> : null}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 40, width: '80%' }}>
              <Button bordered onPress={() => uploadImage()}>
                <Text>
                  Upload an image
                </Text>
              </Button>
              <Button bordered success onPress={() => submitHandler()}>
                <Text>
                  Done
              </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </CardItem>
    </Card>
  );
};

export default CreateDiscussion;
