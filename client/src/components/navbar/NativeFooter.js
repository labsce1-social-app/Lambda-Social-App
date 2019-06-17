import React, { useContext } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Store } from '../../context';
import { Link } from 'react-router-native';
import { handleAuth } from '../../utils/Requests';

const NativeFooter = ({ history }) => {
  return (
    <Footer>
      <FooterTab>
        <Button vertical>
          <Link to="/home">
            <Icon name="home" />
          </Link>
        </Button>

        <Button vertical>
          <Icon name="brush" />
        </Button>

        <Button vertical active onPress={() => history.push('/login')}>
          <Icon
            active
            name="key"
            style={{ transform: [{ rotate: '-90deg' }] }}
          />
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default NativeFooter;
