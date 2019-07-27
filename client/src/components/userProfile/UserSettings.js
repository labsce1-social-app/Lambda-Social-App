import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Thumbnail, Card, CardItem, Text, Button, Icon, Input, Spinner, Toast } from 'native-base';
import { uploadImage } from '../../context/actions/discussionActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isEmpty } from '../../utils/utility';
import { updateUser } from '../../context/actions/userActions';

const UserSettings = ({ user, dispatch, newImage, loading }) => {
    const [editing, setEditing] = useState(false)
    const [username, setUserName] = useState(user.username);
    const [title, setTitle] = useState(user.title);
    const [avatar, setAvatar] = useState(user.avatar);

    useEffect(() => {
        if (!isEmpty(newImage)) {
            return setAvatar(newImage);
        }
    }, [newImage])

    const handleImage = () => {
        return uploadImage(dispatch);
    }

    const updateUserProfile = () => {
        const data = {
            username, title, avatar, id: user.id
        }
        if (isEmpty(username)) {
            return Toast.show({
                text: "Username Can't be empty!",
                buttonText: 'Okay',
                type: 'warning'
            })
        }
        if (isEmpty(avatar)) {
            return Toast.show({
                text: "Your avatar can't be empty",
                buttonText: 'Okey',
                type: 'warning'
            })
        }

        const up = updateUser(dispatch, data);
        const close = setEditing(false);
        return { up, close }
    }

    const renderContent = () => {
        let content;
        if (editing === false) {
            content = (
                <Card>
                    <CardItem header>
                        <Thumbnail source={{ uri: avatar }} />
                        <Text style={{ marginLeft: 20 }}>Name: {username}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Title: {title ? title : 'No Title Yet'}</Text>
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
                    <CardItem header>
                        {loading === true ? <Spinner /> : <TouchableOpacity onPress={() => handleImage()}>

                            <Thumbnail source={{ uri: avatar }} />
                        </TouchableOpacity>
                        }
                        <Text style={{ marginLeft: 20 }}>Name: </Text>
                        <Input rounded value={username} onChangeText={e => setUserName(e)} />
                    </CardItem>
                    <CardItem>
                        <Text>Title: </Text>
                        <Input rounded value={title} onChangeText={e => setTitle(e)}
                            placeholder="Software Engineer at Neral" />
                    </CardItem>
                    <CardItem>
                        <Text>Joined {moment(user.created_at).format('DD/MMM/YYYY')}</Text>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Button
                            onPress={() => updateUserProfile()}
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
                        <Button
                            onPress={() => setEditing(false)}
                            rounded danger iconLeft style={{
                                borderColor: '#ddd',
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                            }}>
                            <Icon name="md-close" />
                            <Text>Cancel</Text>
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