import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { theme } from '../common/theme';
import UserView from '../components/userProfile/UserView';
import { Container } from 'native-base';
import { viewUserProfile } from '../context/actions/userActions';
import { isEmpty } from '../utils/utility';
import { withNavigationFocus } from 'react-navigation';
// this component will render all of the UserProfile, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const UserViewPage = ({ navigation }) => {
    const [userProfile, setUserProfile] = useState(null);
    const userId = navigation.getParam('userId');


    // backend is expecting and object called userData with an id param. If I changed it in the backend it might mess up other components that are using this endpoint.
    const userData = {
        id: userId
    }
    useEffect(() => {
        setUser(setUser);
    }, () => setUser())

    // beautiful call backs
    const setUser = () => viewUserProfile(userData, setUserProfile);
    console.log(userProfile)
    return (
        <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
            <UserView user={userProfile} loading={isEmpty(userProfile)} />
        </Container>
    );
};

// setting name of subtopic in header
UserViewPage.navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('userName')}`,
    headerTitleStyle: {
        fontSize: 16
    }
});

export default withNavigationFocus(UserViewPage);