import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import store from './store/index';

import GoalScreen from './GoalScreen';

const Root = createStackNavigator(
  {
    Goal: GoalScreen,
  },
  {
    initialRouteName: 'Goal',
  },
);

const App = () => [(
  <StatusBar
    key="status-bar"
    backgroundColor="blue"
    barStyle="light-content"
  />), (
    <Provider key="provider" store={store}>
      <Root />
    </Provider>
  )];

export default App;
