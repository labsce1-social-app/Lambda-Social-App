import React from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

// Floating action button for posts.
const FabButton = ({ navigation }) => {
    return (
        <ActionButton buttonColor="rgba(231, 76, 60, 1)">
            <ActionButton.Item buttonColor="#9b59b6" title="Create Discussion" size={40} onPress={() => navigation.navigate('PostADiscussion', {
                subId: navigation.state.params.subId
            })}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    )
}

export default withNavigation(FabButton);

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
})