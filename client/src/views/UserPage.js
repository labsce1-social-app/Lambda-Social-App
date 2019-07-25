import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { theme } from '../common/theme';
import UserSettings from '../components/userProfile/UserSettings';
import { Container } from 'native-base';
// this component will render all of the UserProfile, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const UserPage = props => {
    const { state, dispatch } = useContext(Store);

    return (
        <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
            <UserSettings user={state.user} dispatch={dispatch} newImage={state.newImage} />
        </Container>
    );
};

export default UserPage;