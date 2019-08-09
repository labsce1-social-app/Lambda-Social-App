import React from 'react';
import { Card, Toast, CardItem, Icon, Text, Right } from 'native-base';
import { handleAuth, handleLogout } from '../../context/actions/authActions';
import { theme } from '../../common/theme';
import { isEmpty } from '../../utils/utility';

const NavLinks = ({ navigation, state, dispatch, text }) => {

  const handleLogging = () => {
    if (state.isAuthenticated === false || isEmpty(state.user)) {
      handleAuth(dispatch);
      navigation.closeDrawer();
    } else {
      handleLogout(dispatch);
      navigation.closeDrawer();
    }
  };

  const handleRecent = () => {
    if (state.isAuthenticated === true && !isEmpty(state.user)) {
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
          style={{ color: state.isAuthenticated || !isEmpty(state.user) ? 'black' : 'gray' }}
        />
        <Text style={{ color: state.isAuthenticated || !isEmpty(state.user) ? 'black' : 'gray' }}>
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
