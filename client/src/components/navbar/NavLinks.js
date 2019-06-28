import React from 'react';
import { Card, CardItem, Icon, Text, Right } from 'native-base';
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
    return (
        <Card>
            <CardItem>
                <Icon active name="md-swap" />
                <Text>About LS Social</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem button onPress={() => navigation.navigate('Discussions', {
                subId: state.user.id
            })}>
                <Icon active name="md-pulse" />
                <Text>Recent Posts</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="md-star" />
                <Text>Favorite Subs</Text>
                <Right>
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