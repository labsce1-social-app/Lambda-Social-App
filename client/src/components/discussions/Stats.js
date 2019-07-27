import React from 'react';
import { Card, CardItem, Icon, Text } from 'native-base';

const Stats = ({ stats }) => {
    return (
        <Card>
            <CardItem iconLeft>
                <Icon name="md-body" />
                <Text> {stats.total_users} Developers and Designers</Text>
            </CardItem>
            <CardItem iconLeft>
                <Icon name="md-bonfire" />
                <Text>{stats.total_comments} Comments to date.</Text>
            </CardItem>
            <CardItem iconLeft>
                <Icon name="md-bookmarks" />
                <Text>{stats.total_subtopics} Subtopics to choose from.</Text>
            </CardItem>
        </Card>
    )
}

export default Stats;