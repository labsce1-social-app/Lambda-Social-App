import React, { useState } from 'react';
import { Icon, Fab } from 'native-base';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const FabButton = ({ navigation }) => {
    console.log(navigation)
    const [active, setActive] = useState(false)

    return (
        <Fab
            active={active}
            direction="up"
            containerStyle={{}}
            style={[{ backgroundColor: '#5067FF' }, styles.shadow]}
            position="bottomRight"
            onPress={() => navigation.navigate('PostADiscussion', {
                subId: navigation.state.params.subId
            })}>
            <Icon name="md-add-circle" />
        </Fab >
    );
}

export default withNavigation(FabButton);

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