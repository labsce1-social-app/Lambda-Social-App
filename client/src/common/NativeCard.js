import React from 'react';
import { Content, Card, CardItem, Text, Body } from 'native-base';

const NativeCard = (props) => {
    return (
        <Content>
            <Card>
                <CardItem header>
                    <Text>{props.header}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {props.body}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>{props.footer}</Text>
                </CardItem>
            </Card>
        </Content>
    );
}

export default NativeCard;