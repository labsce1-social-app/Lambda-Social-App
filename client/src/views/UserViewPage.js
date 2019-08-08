import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../context';
import { theme } from '../common/theme';
import UserView from '../components/userProfile/UserView';
import { Container } from 'native-base';
// this component will render all of the UserProfile, I'm not sure if we'll need the scrollview component or not, it's pretty useless I think.
const UserViewPage = () => {
    const { state, dispatch } = useContext(Store);

    return (
        <Container style={{ backgroundColor: theme.colors.offWhite, padding: 5 }}>
            <UserView user={state.user} newImage={state.newImage} loading={state.newImage_loading} />
        </Container>
    );
};

export default UserViewPage;