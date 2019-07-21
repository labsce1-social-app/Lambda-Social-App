import React from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

// Floating action button for posts.
const FabButton = (props) => {
    return (
        <ActionButton buttonColor="rgba(231, 76, 60, 1)">
            {/* <ActionButton.Item
                buttonColor="#1abc9c" title="Others" size={40} onPress={() => console.log('3rd button pressed')}>
                <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor="#3498db" title="Notifications" size={40} onPress={() => console.log('2nd button pressed')}>
                <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item> */}
            <ActionButton.Item buttonColor="#9b59b6" title="Reply" size={40} onPress={props.replyToComment}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    )
}

export default FabButton;

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
})