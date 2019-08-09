import React from 'react';
import About from '../components/about/About';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Platform } from 'react-native';
import { theme } from '../common/theme';

const AboutPage = (props) => {

    return (
        <Container
            style={{
                backgroundColor: Platform.OS === 'ios' ?
                    theme.colors.white : theme.colors.offWhite,
                padding: 5
            }}>
            <About />
        </Container>
    )
}

AboutPage.navigationOptions = ({ navigation }) => ({
    title: 'About neral',
    headerTitleStyle: {
        fontSize: 16,
    }
})

export default withNavigation(AboutPage);
