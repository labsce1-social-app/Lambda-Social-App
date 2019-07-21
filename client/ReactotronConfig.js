import Reactotron from 'reactotron-react-native';

Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in RN plugins
    .connect();