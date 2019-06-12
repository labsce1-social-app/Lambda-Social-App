import React, { useState, useContext, useEffect } from 'react';
import { Store } from './src/context/';
// memory usage optimize for screen changing
import { useScreens } from 'react-native-screens';
import Wrapper from './src/components/Wrapper';
import NativeHeader from './src/components/navbar/NativeHeader';
import AppNavigator from './AppNavigator';
import Splash from './src/common/Splash';
import { StoreProvider } from './src/context/';
import { getDiscussions } from './src/components/discussions/helpers';

useScreens();

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const SubApp = () => {
  const { state, dispatch } = useContext(Store)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiscussions(state.sortBy, dispatch)
  }, getDiscussions());

  useEffect(() => {
    closeSplash()
  }, () => closeSplash());

  const closeSplash = () => {
    if (state.top_discussions !== undefined || state.top_discussions.length !== 0) {
      setLoading(false);
    }
  };
  console.log('state: ', state)
  console.log('dispatch: ', dispatch)

  return (
    loading ? <Splash /> :
      (
        <Wrapper>
          <NativeHeader />
          <AppNavigator />
        </Wrapper>
      )
  );
};

export default App = () => (
  <StoreProvider>
    <SubApp />
  </StoreProvider>
)