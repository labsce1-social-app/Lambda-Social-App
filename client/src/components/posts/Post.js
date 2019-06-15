import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { config } from '../../utils/dimensions';
import Comment from './Comment';

const Post = () => {
    return (
        <Card style={{ flex: 0, height: config.deviceHeight * 0.715 }}>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: 'Image URL' }} />
                    <Body>
                        <Text>Luis Diaz</Text>
                        <Text>my-dog-is-awesome</Text>
                        <Text note>April 15, 2016</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: 200, flex: 1 }} />
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi autem atque iusto velit quis nemo, quibusdam excepturi cum non distinctio ad nostrum quidem vel reiciendis optio vitae quos, natus rem et quas eum. Molestias corrupti natus quia. Voluptate fugit sapiente architecto, vel ratione culpa neque quis maiores doloremque. Eveniet hic at dolor, voluptates placeat iusto ratione beatae quis. Quisquam, fugiat!
                    </Text>
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                        <Icon name="heart" />
                        <Text>10+</Text>
                    </Button>
                </Left>
            </CardItem>
            <Text>Comments</Text>
            <ScrollView>

                <Comment
                    image={"some image"}
                    date="2019-06-07 14:11:24"
                    name="Carlos Lantigua"
                    comment="I really like what you said there bud."
                />
            </ScrollView>
        </Card>
    );
}

export default Post;