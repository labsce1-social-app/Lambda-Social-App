import React, { useContext } from 'react';
import { Store } from '../../context';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { handleAuth } from '../../utils/Requests';
import isEmpty from '../../utils/isEmpty';

const NativeFooter = ({ history }) => {
  const { state, dispatch } = useContext(Store);
  let footerContent;
  if (state.isAuthenticated === false) {
    footerContent = (
      <Button vertical active onPress={() => handleAuth(dispatch, history)}>
        <Icon active name="key" style={{ transform: [{ rotate: '-90deg' }] }} />
      </Button>
    )
  } else {
    footerContent = (
      <Button vertical>
        <Icon name="mail" />
      </Button>
    )
  }
  return (
    <Footer>
      <FooterTab>

        <Button vertical onPress={() =>
          history.location === '/home' ? null : history.push('/home')}>
          <Icon name="home" />
        </Button>

        <Button vertical>
          <Icon name="brush" />
        </Button>
        {footerContent}

      </FooterTab>
    </Footer>
  )
}

export default NativeFooter;
