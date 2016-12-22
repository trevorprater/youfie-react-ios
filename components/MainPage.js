'use strict';
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js')

class MainPage extends Component {
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navigationBar}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <TouchableHighlight style={{backgroundColor: 'yellow', padding: 10}}
            onPress={this.gotoPersonPage.bind(this)}>
          <Text style={{backgroundColor: 'yellow', color: 'green'}}>next</Text>
        </TouchableHighlight>
      </View>
    );
  }
  gotoPersonPage() {
    this.props.navigator.push({
      id: 'PersonPage',
      name: 'person page',
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
        return
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          home
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = MainPage;
