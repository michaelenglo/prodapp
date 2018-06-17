import React from 'react';
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

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
