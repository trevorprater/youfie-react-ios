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

var LoginPage = require('./pages/LoginPage');
var SignupPage = require('./pages/SignupPage');
var CameraPage = require('./pages/CameraPage');
var PhotoPage = require('./pages/PhotoPage');
var NoNavigatorPage = require('./pages/NoNavigatorPage');

const styles = require('./styles.js');
const constants = require('./constants.js');
const firebase = require('firebase');
const firebaseApp = firebase.initializeApp(constants.firebaseConfig)
const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images');


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
            initialRoute={{id: 'LoginPage', name: 'Index'}}
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

        if (routeId === 'LoginPage') {
            return (
                <LoginPage navigator={navigator} firebaseApp={firebaseApp}/>);
        }
        if (routeId === 'SignupPage') {
            navigator.pop()
            return (
                <SignupPage navigator={navigator} firebaseApp={firebaseApp}/>);
        }
        if (routeId === 'CameraPage') {
            return (
                <CameraPage navigator={navigator} firebaseApp={firebaseApp}/>);
        }
        if (routeId === 'PhotoPage') {
            return (
                <PhotoPage navigator={navigator} firebaseApp={firebaseApp} imagesRef={imagesRef} imgPath={route.imgPath} imgB64={route.imgB64}/>);
        }
        if (routeId === 'NoNavigatorPage') {
            return (
                <NoNavigatorPage navigator={navigator} firebaseApp={firebaseApp}/>
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
