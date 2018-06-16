import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

import GoalScreen from './GoalScreen.js';

export default createStackNavigator(
  {
    Goal: GoalScreen,
  },
  {
    initialRouteName: 'Goal',
  }
);
