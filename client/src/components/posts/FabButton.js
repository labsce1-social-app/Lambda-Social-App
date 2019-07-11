import React, { useState } from 'react';
import {
    Button,
    // Icon,
    // Fab
} from 'native-base';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

// Floating action button for posts.
const FabButton = (props) => {
    return (
        <ActionButton buttonColor="rgba(231, 76, 60, 1)">
            <ActionButton.Item buttonColor="#9b59b6" title="Reply" onPress={props.replyToComment}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor="#3498db" title="Notifications" onPress={() => console.log('2nd button pressed')}>
                <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor="#1abc9c" title="Others" onPress={() => console.log('3rd button pressed')}>
                <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    )
}
// const FabButton = (props) => {
//     const [active, setActive] = useState(false)
//     return (
//         <Fab
//             active={active}
//             direction="up"
//             containerStyle={{}}
//             style={[{ backgroundColor: '#5067FF' }, styles.shadow]}
//             position="bottomRight"
//             onPress={() => setActive(!active)}>
//             <Icon name="arrow-up" />
//             <Button style={[{ backgroundColor: '#34A34F' }, styles.shadow]} onPress={props.replyToComment}>
//                 <Icon name="md-code-working" />
//             </Button>
//             <Button style={[{ backgroundColor: '#3B5998' }, styles.shadow]}>
//                 <Icon name="md-star-outline" />
//             </Button>
//             <Button disabled style={[{ backgroundColor: '#DD5144' }, styles.shadow]}>
//                 <Icon name="mail" />
//             </Button>
//         </Fab>
//     );
// }

export default FabButton;

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
})