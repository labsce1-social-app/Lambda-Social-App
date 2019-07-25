import React, { useState } from 'react';
import moment from 'moment';
import { Thumbnail, Card, CardItem, Text, Button, Icon, Left, Input } from 'native-base';

const UserSettings = ({ user }) => {
    const [editing, setEditing] = useState(false)
    const [username, setUserName] = useState(user.username);
    const [title, setTitle] = useState(user.title);

    const renderContent = () => {
        let content;
        if (editing === false) {
            content = (
                <Card>
                    <CardItem>
                        <Thumbnail source={{ uri: user.avatar }} />
                        <Text style={{ marginLeft: 20 }}>Name: {user.username}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Title: {user.title ? user.title : 'No Title Yet'}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Joined {moment(user.created_at).format('DD/MMM/YYYY')}</Text>
                    </CardItem>
                    <CardItem>
                        <Button
                            rounded
                            onPress={() => setEditing(true)}
                            primary
                            iconLeft
                            style={{
                                borderColor: '#ddd',
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                            }}>
                            <Icon name="md-create" />
                            <Text>Edit Profile</Text>
                        </Button>
                    </CardItem>

                </Card>
            )
        } else {
            content = (
                <Card>
                    <CardItem>
                        <Thumbnail source={{ uri: user.avatar }} />
                        <Text style={{ marginLeft: 20 }}>Name: </Text>
                        <Input rounded value={username} onChange={e => setUserName(e)} />
                    </CardItem>
                    <CardItem>
                        <Text>Title: </Text>
                        <Input rounded value={title} onChange={e => setTitle(e)}
                            placeholder="Software Engineer at LambdaSchool" />
                    </CardItem>
                    <CardItem>
                        <Text>Joined {moment(user.created_at).format('DD/MMM/YYYY')}</Text>
                    </CardItem>
                    <CardItem>
                        <Button
                            onPress={() => setEditing(false)}
                            rounded success iconLeft style={{
                                borderColor: '#ddd',
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                            }}>
                            <Icon name="md-checkmark" />
                            <Text>Done</Text>
                        </Button>
                    </CardItem>

                </Card>
            )
        }
        return content;
    }
    return renderContent()
}

export default UserSettings;