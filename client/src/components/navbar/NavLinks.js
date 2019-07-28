import React from 'react';
import { Card, Toast, CardItem, Icon, Text, Right } from 'native-base';
import { handleAuth, handleLogout } from '../../context/actions/authActions';
import { theme } from '../../common/theme';

const NavLinks = ({ navigation, state, dispatch, text }) => {
  const handleLogging = () => {
    if (state.isAuthenticated === false) {
      handleAuth(dispatch);
      navigation.closeDrawer();
    } else {
      handleLogout(dispatch);
      navigation.closeDrawer();
    }
  };

  const handleRecent = () => {
    if (state.isAuthenticated === true) {
      navigation.navigate('RecentDiscussions', {
        subId: state.user.id
      });
    } else {
      Toast.show({
        text: 'You must be logged in!',
        buttonText: 'Okay',
        type: 'danger',
        duration: 5000
      });
    }
  };

  const handleSearch = () => {
    navigation.navigate('Hashtags', {
      subId: state.user.id
    });
  };

  return (
    <Card style={{ background: theme.colors.white }}>
      <CardItem button onPress={() => navigation.navigate('AboutPage')}>
        <Icon active name="md-swap" />
        <Text>About neral</Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </CardItem>

      <CardItem button onPress={() => handleRecent()}>
        <Icon
          active
          name="md-pulse"
          style={{ color: state.isAuthenticated ? 'black' : 'gray' }}
        />
        <Text style={{ color: state.isAuthenticated ? 'black' : 'gray' }}>
          Recent Posts
        </Text>
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
  );
};

export default NavLinks;
