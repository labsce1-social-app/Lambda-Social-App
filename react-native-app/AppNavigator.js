import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

// import ComponentName from './.'
import HomePage from './src/views/LandingPage';

import Login from './auth0/index';

/** default stack navigation **
 * Drawer and tab Navigator need custom components
 */
const AppNavigator = createStackNavigator(
  {
    // RouteName: ComponentName,
    Home: HomePage,
    Login: Login
  },
  {
    initialRouteName: 'Home'
  }
);

// place navigators inside createAppContainer
export default createAppContainer(AppNavigator);
