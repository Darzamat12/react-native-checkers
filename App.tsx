import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/components/HomeScreen/HomeScreen';
import  SettingsScreen  from './src/components/SettingsScreen';
import  GameScreen  from './src/components/GameScreen/GameScreen';
import rootReducer from './src/redux/reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import Routes from './src/components/Routes'



const store = createStore(rootReducer, composeWithDevTools())

export default function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
