import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Link } from 'react-router-native';

const NativeFooter = ({ loading }) => {
    return loading === false ? (
        <Footer>
            <FooterTab>

                <Button vertical>
                    <Link to="/">
                        <Icon name="home" />
                    </Link>
                </Button>

                <Button vertical>
                    <Icon name="brush" />
                </Button>

                <Button vertical active>
                    <Link to='/login'>
                        <Icon active name="key" style={{ transform: [{ rotate: '-90deg' }] }} />
                    </Link>
                </Button>

            </FooterTab>
        </Footer>
    ) : null
}

export default NativeFooter;