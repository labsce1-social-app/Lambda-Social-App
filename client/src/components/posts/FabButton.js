import React, { useState } from 'react';
import { Button, Icon, Fab } from 'native-base';
import { StyleSheet } from 'react-native';

const FabButton = (props) => {

    const [active, setActive] = useState(false)

    return (
        <Fab
            active={active}
            direction="up"
            containerStyle={{}}
            style={[{ backgroundColor: '#5067FF' }, styles.shadow]}
            position="bottomRight"
            onPress={() => setActive(!active)}>
            <Icon name="arrow-up" />
            <Button style={[{ backgroundColor: '#34A34F' }, styles.shadow]} onPress={props.replyToComment}>
                <Icon name="md-code-working" />
            </Button>
            <Button style={[{ backgroundColor: '#3B5998' }, styles.shadow]}>
                <Icon name="md-star-outline" />
            </Button>
            <Button disabled style={[{ backgroundColor: '#DD5144' }, styles.shadow]}>
                <Icon name="mail" />
            </Button>
        </Fab>
    );
}

export default FabButton;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    }
})