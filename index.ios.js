/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react';
//var ReactNative = require('react-native');
import ReactNative, {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity
} from 'react-native';

var SplashPage = require('./components/SplashPage');
var LoginPage = require('./components/LoginPage');
var SignupPage = require('./components/SignupPage');
var MainPage = require('./components/MainPage');
var PersonPage = require('./components/PersonPage');
var NoNavigatorPage = require('./components/NoNavigatorPage');

const styles = require('./styles.js');

const firebaseConfig = {
    apiKey: "AIzaSyDqk1DhYw2PfDVpU9NPPf5BZrCWHJ2lVIo",
    authDomain: "youfie-983ce.firebaseapp.com",
    databaseURL: "https://youfie-983ce.firebaseio.com",
    storageBucket: "youfie-983ce.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

class Youfie extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{id: 'SplashPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          navigator={navigator} />
      );
    }
    if (routeId === 'SignupPage') {
        navigator.pop()
        return (
        <SignupPage
            navigator={navigator} />
        );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator} />
      );
    }
    if (routeId === 'PersonPage') {
      return (
        <PersonPage
          navigator={navigator} />
      );
    }
    if (routeId === 'NoNavigatorPage') {
      return (
        <NoNavigatorPage
            navigator={navigator} />
      );
    }
    return this.noRoute(navigator);

  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>configure the route for this page in the render scene of index.js</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('Youfie', () => Youfie);
