/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import LocationReducer from './src/Redux/LocationReducer';
import Main from './src/screens/Main';

const store = createStore(LocationReducer);

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store ={store}>
      <SafeAreaView style={{flex: 1}}>
            <Main/>
      </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
