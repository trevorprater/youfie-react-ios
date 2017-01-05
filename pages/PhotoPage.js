'use strict';

var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    Navigator,
    TouchableOpacity,
} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js')

class PhotoPage extends Component {
    componentWillMount() {
        this.uploadPhoto();
    }

    uploadPhoto() {

    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={styles.navigationBarClear}
                        routeMapper={NavigationBarRouteMapper} />
                }
            />
        );
    }

    renderScene(route, navigator) {
        return (
            <View style={{flex: 1, backgroundColor: styles.constants.youfieColor}}>
                <Image source={{uri: 'data:image/png;base64,' + this.props.imgData}} style={{flex: 1, resizeMode: 'cover'}} />
            </View>
        );
    }

    gotoNext() {
        this.props.navigator.push({
            id: 'NoNavigatorPage',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        });
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, nextState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => navigator.parentNavigator.pop()}>
                <Image
                    source={require('../assets/backarrow-youfie-logo2.png')}
                    style={styles.navigationBarIcon}
                />
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, nextState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => navigator.parentNavigator.push({id: 'unknown'})}>
            </TouchableOpacity>
        );
    },

    Title(route, navigator, index, nextState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
            </TouchableOpacity>
        );
    },
};

module.exports = PhotoPage;
