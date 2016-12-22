'use strict';

var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js')

class NoNavigatorPage extends Component {
  render() {
    var navigator = this.props.navigator;
    return (
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => navigator.pop()}>
          <Text style={{color: 'yellow'}}>no nav bar, attempt kill</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

module.exports = NoNavigatorPage;
