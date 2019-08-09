import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { theme } from '../common/theme';
import UserView from '../components/userProfile/UserView';
import { Container } from 'native-base';
import { viewUserProfile } from '../context/actions/userActions';
import { isEmpty } from '../utils/utility';

// this component will render all of the UserProfile, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const UserViewPage = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const { state, dispatch } = useContext(Store);
    const userId = navigation.getParam('userId');

    useEffect(() => {
        return setUser();
    }, [])
    const setUser = () => setUserData(viewUserProfile(userId));
    console.log(userData)
    return (
        <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
            <UserView user={userData} loading={isEmpty(userData)} />
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

export default UserViewPage;