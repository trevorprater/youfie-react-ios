'use strict';

var ReactNative = require('react-native');
var {
  View,
  Text,
} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js');

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'LoginPage',
      });
    }, 1000);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: styles.constants.youfieColor, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 2, backgroundColor: styles.constants.youfieColor, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.youfieLogo}>youfie</Text>
          </View>
          <View style={{flex: 2, backgroundColor: styles.constants.youfieColor, alignItems: 'center', justifyContent: 'center'}}/>
      </View>
    );
  }
}

module.exports = SplashPage;
