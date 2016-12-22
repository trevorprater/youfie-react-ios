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
    ListView,
    View,
    Navigator,
    TouchableOpacity
} from 'react-native';

var SplashPage = require('./pages/SplashPage');
var LoginPage = require('./pages/LoginPage');
var SignupPage = require('./pages/SignupPage');
var MainPage = require('./pages/MainPage');
var PersonPage = require('./pages/PersonPage');
var NoNavigatorPage = require('./pages/NoNavigatorPage');

const styles = require('./styles.js');

const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyDqk1DhYw2PfDVpU9NPPf5BZrCWHJ2lVIo",
    authDomain: "youfie-983ce.firebaseapp.com",
    databaseURL: "https://youfie-983ce.firebaseio.com",
    storageBucket: "youfie-983ce.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

class Youfie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.photosRef = this.getRef().child('items');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForPhotos(photosRef) {
        photosRef.on('value', (snap) => {
            //get children as an array
            var photos=[];
            snap.forEach((child) => {
                photos.push({
                    title: child.val().title,
                    _key: child.ey
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(photos)
            });
        });
    }

    componentDidMount() {
        this.listenForPhotos(this.photosRef);
    }



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
                <SplashPage navigator={navigator} />);
        }
        if (routeId === 'LoginPage') {
            return (
                <LoginPage navigator={navigator} />);
        }
        if (routeId === 'SignupPage') {
            navigator.pop()
            return (
                <SignupPage navigator={navigator} />);
        }
        if (routeId === 'MainPage') {
            return (
                <MainPage navigator={navigator} />);
        }
        if (routeId === 'PersonPage') {
            return (
                <PersonPage navigator={navigator} />);
        }
        if (routeId === 'NoNavigatorPage') {
            return (
                <NoNavigatorPage navigator={navigator} />
            );
        }
        return this.noRoute(navigator);
    }

    noRoute(navigator) {
        return (
            <View style={{
                flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}onPress={() => navigator.pop()}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>configure the route for this page in the render scene of index.js</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

AppRegistry.registerComponent('Youfie', () => Youfie);
