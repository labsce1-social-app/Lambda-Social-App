import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

// import ComponentName from './.'
import HomePage from './src/views/LandingPage';

/** default stack navigation **
 * Drawer and tab Navigator need custom components
 */
const AppNavigator = createStackNavigator(
  {
    // RouteName: ComponentName,
    Home: HomePage
  },
  {
    initialRouteName: 'Home'
  }
);

// place navigators inside createAppContainer
export default createAppContainer(AppNavigator);
