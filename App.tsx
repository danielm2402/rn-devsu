/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import Header from './src/components/appheaders/Header';
function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Header title='BANCO' />
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
