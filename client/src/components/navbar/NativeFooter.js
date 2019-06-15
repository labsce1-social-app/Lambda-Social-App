import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Link } from 'react-router-native';

const NativeFooter = () => {
  return (
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

        <Button vertical>
          <Link to="/subtopics">
            <Icon name="paper" />
          </Link>
        </Button>

        <Button vertical>
          <Link to="/:subtopic_id/discussions">
            <Icon name="chatbubbles" />
          </Link>
        </Button>

        <Button vertical active>
          <Link to="/login">
            <Icon
              active
              name="key"
              style={{ transform: [{ rotate: '-90deg' }] }}
            />
          </Link>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default NativeFooter;
