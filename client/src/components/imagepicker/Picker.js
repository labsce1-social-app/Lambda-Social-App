import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from 'react-native-dotenv';


const Picker = (props) => {
    const uploadImage = () => {
        ImagePicker.showImagePicker({}, (response) => {
            /*response returns an object with all of the information about the selected image.
            returns data, fileName, fileSize, height, isVertical, latitude, longitude, origURL,
            timestamp, type, uri, width.
            */
            // extract this data for the file upload
            const file = {
                uri: response.uri,
                name: response.fileName,
                type: 'image/png'
            }
            console.log(file)
            // s3 configurations
            const config = {
                keyPrefix: 's3/',
                bucket: 'lambdasocialbucket',
                region: 'us-east-1',
                accessKey: AWS_ACCESS_KEY_ID,
                secretKey: AWS_SECRET_ACCESS_KEY,
                successActionStatus: 201
            }
            RNS3.put(file, config)
                .then((response) => {
                    if (response.status === 403) {
                        console.log(response);
                        throw new Error("Failed to upload image to S3");
                    } else {
                        /*
                        response will come back looking like this, we'll want
                        the location for the POST request to make a discussion.
                            location: "https://lambdasocialbucket.s3.amazonaws.com/s3%2FIMG_0111.HEIC"
                        }
                            */

                        //TODO: remove this console log and replace it with code
                        console.log(response.body.postResponse.location);
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }
    return (
        <TouchableOpacity onPress={() => uploadImage()}>
            <Text>Upload an image...</Text>
        </TouchableOpacity>
    )
}

export default Picker;
