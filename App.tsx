import React from 'react';

import {
  StatusBar,
} from 'expo-status-bar';

import {
  AppProvider,
} from './src/Context/AppContext';

import AppNavigator from './src/Navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />

      <AppNavigator />
    </AppProvider>
  );
}