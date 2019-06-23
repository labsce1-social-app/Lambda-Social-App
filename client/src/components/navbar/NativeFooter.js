import React, { useContext } from 'react';
import { Store } from '../../context';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { handleAuth } from '../../utils/Requests';

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
        {/* TODO: if user is home, make this do nothing */}
        <Button vertical onPress={() => history.push('/home')}>
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
