import {
    AUTH0_CLIENT,
    AUTH0_DOMAIN,
    LOCAL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    POSTGRES
} from 'react-native-dotenv';
import { storeData, getData, deleteData } from '../../utils/AsyncStorage';
import { isEmpty } from '../../utils/utility';
import Auth0 from 'react-native-auth0';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { RNS3 } from 'react-native-aws3';

const auth0ClientId = AUTH0_CLIENT;
const auth0Domain = AUTH0_DOMAIN;
const local = `http://localhost:3000`;
const base_url = `https://social-app-test.herokuapp.com`;
// const postgres = 'https://lambdasocial-postgres.herokuapp.com';
const postgres = 'http://localhost:3000';

module.exports = {
    auth0ClientId,
    auth0Domain,
    local,
    base_url,
    postgres,
    isEmpty,
    Auth0,
    ImagePicker,
    axios,
    jwtDecode,
    RNS3,
    storeData,
    getData,
    deleteData,
    LOCAL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    POSTGRES
}