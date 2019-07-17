import React from 'react';
import { Flatlist } from 'react-native';
import { View, Text } from 'native-base';
import Profile from './Profile';
import Team from './team';


const About = () => {
    return (
        <View>
            <Text>LS Team</Text>
            <Flatlist
                data={Team}
                keyExtractor={({ item }) => item.name}
                renderItem={({ item }) => {
                    <Profile
                        image={item.image}
                        name={item.name}
                        title={item.title}
                    />
                }} />
        </View>
    )
}

export default About;