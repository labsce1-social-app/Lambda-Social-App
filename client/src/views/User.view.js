import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { theme } from '../common/theme';
import UserSettings from '../components/userProfile/UserSettings';
import { Container } from 'native-base';
// this component will render all of the UserProfile, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const UserPage = props => {
    const { state, dispatch } = useContext(Store);
    const { auth: { user } } = state;
    const { discussion: { newImage, newImage_loading } } = state;
    return (
        <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
            <UserSettings user={user} dispatch={dispatch} newImage={newImage} loading={newImage_loading} />
        </Container>
    );
};

export default UserPage;