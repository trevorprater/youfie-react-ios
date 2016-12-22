'use strict';

var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js')

class PersonPage extends Component {
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
            onPress={this.gotoNext.bind(this)}>
          <Text>personal home page</Text>
        </TouchableOpacity>
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
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          goback 
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'unknown'})}>
        <Text style={{color: 'white', margin: 10,}}>
          test your luck
        </Text>
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        homepage
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = PersonPage;
