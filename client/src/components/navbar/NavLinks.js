import React from 'react';
import { Card, Toast, CardItem, Icon, Text, Right } from 'native-base';
import { handleAuth, handleLogout } from '../../utils/Requests';

const NavLinks = ({ navigation, state, dispatch, text }) => {
    const handleLogging = () => {
        if (state.isAuthenticated === false) {
            handleAuth(dispatch);
            navigation.closeDrawer();
        } else {
            handleLogout(dispatch);
            navigation.closeDrawer();
        }
    }

    const handleRecent = () => {
        if (state.isAuthenticated === true) {
            navigation.navigate('RecentDiscussions', {
                subId: state.user.id
            })
        } else {
            Toast.show({
                text: 'You must be logged in!',
                buttonText: 'Okay',
                type: 'danger',
                duration: 5000
            })
        }
    }

    const handleFavorites = () => {
        Toast.show({
            text: 'Feature coming soon',
            buttonText: 'Okay',
            type: 'success',
            duration: 5000
        })
    }

    const handleSearch = () => {
        navigation.navigate('Hashtags', {
            subId: state.user.id
        })
    }

    return (
        <Card>
            <CardItem>
                <Icon active name="md-swap" />
                <Text>About LS Social</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem button onPress={() => handleRecent()}>
                <Icon active name="md-pulse" style={{ color: state.isAuthenticated ? 'black' : 'gray' }} />
                <Text style={{ color: state.isAuthenticated ? 'black' : 'gray' }}>Recent Posts</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem button onPress={() => handleFavorites()}>
                <Icon
                    active
                    name="md-star"
                    style={{ color: state.isAuthenticated ? 'black' : 'gray' }} />
                <Text style={{ color: state.isAuthenticated ? 'black' : 'gray' }}>Favorite Subs</Text>
                <Right >
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem button onPress={() => handleSearch()}>
                <Icon
                    active
                    name="md-grid"
                    style={{ color: state.isAuthenticated ? 'black' : 'gray' }} />
                <Text style={{ color: state.isAuthenticated ? 'black' : 'gray' }}>Hashtag Search</Text>
                <Right >
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem button onPress={() => handleLogging()}>
                <Icon active name="md-power" />
                <Text>{text}</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
        </Card>
    )
}

export default NavLinks