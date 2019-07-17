import React from 'react';
import { View, Linking } from 'react-native';
import { Text, Thumbnail, CardItem, Left, Body, Card, Icon } from 'native-base';

const About = () => {
    return (
        <View>
            <Card>

                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 24 }}>LS Team</Text>

                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Will.png')} />
                        <Body>
                            <Text>Will Schulz</Text>
                            <Text note>Team Lead</Text>
                            <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/kittenman29")} />

                        </Body>
                    </Left>
                </CardItem>

                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Tristan.png')} />
                        <Body>
                            <Text>Tristan Linehan</Text>
                            <Text note>Team Lead</Text>
                            <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/tlinehan")} />
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Carlos.png')} />
                        <Body>
                            <Text>Carlos Lantigua</Text>
                            <Text note>Software Engineer</Text>
                            <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/CLantigua2")} />
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Luis.png')} />
                        <Body>
                            <Text>Luis Diaz</Text>
                            <Text note>Software Engineer</Text>
                            <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/Luisdh")} />

                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Michelle.png')} />
                        <Body>
                            <Text>Michelle Paredes</Text>
                            <Text note>Software Engineer</Text>
                            <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/mparedes003")} />

                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Conner.png')} />
                        <Body>
                            <Text>Conner Hoessly</Text>
                            <Text note>Software Engineer</Text>
                            <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/TRIF3X")} />

                        </Body>
                    </Left>
                </CardItem>
            </Card>
        </View>
    )
}

export default About;