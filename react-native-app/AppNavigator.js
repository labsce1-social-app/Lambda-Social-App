import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

// import ComponentName from './.'
import HomePage from './src/views/LandingPage';

const AppNavigator = createStackNavigator(
  {
    // RouteName: ComponentName,
    Home: HomePage
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
