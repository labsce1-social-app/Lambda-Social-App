import React from 'react';
import About from '../components/about/About';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';

const AboutPage = (props) => {
    return (
        <Container style={{ backgroundColor: Platform.OS === 'ios' ? '#FFFFFF' : '#F6F8FA', padding: 5 }}>
            <About />
        </Container>
    )
}

AboutPage.navigationOptions = ({ navigation }) => ({
    title: 'About LS',
    headerTitleStyle: {
        fontSize: 16
    }
})

export default withNavigation(AboutPage);
