import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { Text, Thumbnail, CardItem, Left, Body, Card, Icon, View } from 'native-base';

const About = () => {
    return (
        <ScrollView>
            <Card>
                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 24 }}>About Neral</Text>
                <CardItem>

                    <Text>Neral was designed to provide a safe environment where Developers, designers and other tech specialists could come together and talk about the tech that excites them. This app hopes to serve as a middle point where all can speak about the tech they're passionate about, ask for help, start a project together and all around socialize.</Text>
                </CardItem>
                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 24 }}>Neral Team</Text>

                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Will.png')} />
                        <Body>
                            <Text>Will Schulz</Text>
                            <Text note>Team Lead</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>

                                <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/kittenman29")} />
                                <Icon name="logo-linkedin" onPress={() => Linking.openURL("https://www.linkedin.com/in/william-schulz/")} />
                            </View>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Tristan.png')} />
                        <Body>
                            <Text>Tristan Linehan</Text>
                            <Text note>Team Lead</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>

                                <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/tlinehan")} />
                                <Icon name="logo-linkedin" onPress={() => Linking.openURL("https://www.linkedin.com/in/tristan-linehan")} />
                            </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Carlos.png')} />
                        <Body>
                            <Text>Carlos Lantigua</Text>
                            <Text note>Software Engineer</Text>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>
                                <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/CLantigua2")} />
                                <Icon name="logo-linkedin" onPress={() => Linking.openURL("https://www.linkedin.com/in/carlos-lantigua/")} />
                            </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Luis.png')} />
                        <Body>
                            <Text>Luis Diaz</Text>
                            <Text note>Software Engineer</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>

                                <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/Luisdh")} />
                                <Icon name="logo-linkedin" onPress={() => Linking.openURL("https://www.linkedin.com/in/luis-diaz-herrera-11a306168/")} />
                            </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Michelle.png')} />
                        <Body>
                            <Text>Michelle Paredes</Text>
                            <Text note>Software Engineer</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>

                                <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/mparedes003")} />
                                <Icon name="logo-linkedin" onPress={() => Linking.openURL("https://www.linkedin.com/in/michellegparedes/")} />

                            </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/team/Conner.png')} />
                        <Body>
                            <Text>Conner Hoessly</Text>
                            <Text note>Software Engineer</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>

                                <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/TRIF3X")} />
                                <Icon name="logo-linkedin" onPress={() => Linking.openURL("https://www.linkedin.com/in/conner-hoessly/")} />

                            </View>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        </ScrollView>
    )
}

export default About;