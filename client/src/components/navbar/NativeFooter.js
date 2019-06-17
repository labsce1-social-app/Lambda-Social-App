import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../context';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { handleAuth } from '../../utils/Requests';
import isEmpty from '../../utils/isEmpty';

const NativeFooter = ({ history }) => {
    const { state, dispatch } = useContext(Store);
    // this state will be used to tell nativefooter if the user is authenticated. It needs to go into useEffect so that it can recheck if changes like a logout has happened
    const [rerender, setRerender] = useState(state.isAuthenticated);

    useEffect(() => {
        return setRerender(state.isAuthenticated)
    }, () => setRerender());

    return (
        <Footer>
            <FooterTab>

                <Button vertical onPress={() => history.push('/home')}>
                    <Icon name="home" />
                </Button>

                <Button vertical>
                    <Icon name="brush" />
                </Button>
                {rerender === false ? (
                    <Button vertical active onPress={() => handleAuth(dispatch, history)}>
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