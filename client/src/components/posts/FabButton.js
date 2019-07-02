import React, { useState } from 'react';
import { Button, Icon, Fab } from 'native-base';

const FabButton = (props) => {

    const [active, setActive] = useState(false)

    return (
        <Fab
            active={active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => setActive(!active)}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
                <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
                <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
                <Icon name="mail" />
            </Button>
        </Fab>
    );
}

export default FabButton;