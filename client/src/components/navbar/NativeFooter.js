import React, { useContext } from 'react';
import { Store } from '../../context';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { handleAuth } from '../../utils/Requests';
import { Link } from 'react-router-native';
import isEmpty from '../../utils/isEmpty';

const NativeFooter = ({ history }) => {
    const { state, dispatch } = useContext(Store);

    return (

        <Footer>
            <FooterTab>

                <Button vertical onPress={() => handleAuth(dispatch)}>
                    <Icon name="home" />
                </Button>

                <Button vertical>
                    <Icon name="brush" />
                </Button>
                {state.isAuthenticated === false ? (
                    <Button vertical active onPress={() => handleAuth(dispatch)}>
                        <Icon active name="key" style={{ transform: [{ rotate: '-90deg' }] }} />
                    </Button>
                ) : <Button vertical>
                        <Icon name="mail" />
                    </Button>}

            </FooterTab>
        </Footer>
    )
}

export default NativeFooter;