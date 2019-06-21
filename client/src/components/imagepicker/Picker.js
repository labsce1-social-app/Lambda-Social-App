import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

const Picker = (props) => {
    const takePic = () => {
        ImagePicker.showImagePicker({}, (response) => {
            console.log(response)
        })
    }
    return (
        <View style={styles.contaienr}>
            <Text style={styles.welcome}>
                Welcome to aws s3 uploader
            </Text>
            <TouchableOpacity onPress={() => takePic()}>
                <Text>Take picture</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Picker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20
    }
})