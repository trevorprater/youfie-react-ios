'use strict';

var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js');

class LoginPage extends Component {
  componentWillMount() {
      this.state = { email: 'email', password: 'password', textHidden: false};
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar style={styles.navigationBar}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
        <View style={{flex: 3, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: styles.constants.youfieColor}}>

            <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.youfieLogo}>youfie</Text>
            </View>
            <View style={{flex:2, justifyContent: 'flex-start'}}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput
                        style={{backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(96,96,96,0.5)', marginBottom: 5, borderWidth: 1,borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50,width: 300, color: 'rgba(96,96,96,0.8)'}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        blurOnSubmit={true}
                        keyboardType={'email-address'}
                        maxLength={50}
                        onFocus={() => this.setState({email: ''})}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}/>
                    <TextInput
                        style={{backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(96,96,96,0.5)', marginBottom: 20, borderWidth: 1,borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50,width: 300, color: 'rgba(96,96,96,0.8)'}}
                        autoCapitalize={'none'}
                        secureTextEntry={this.state.textHidden}
                        autoCorrect={false}
                        blurOnSubmit={true}
                        keyboardType={'default'}
                        maxLength={50}
                        onFocus={() => this.setState({password: '', textHidden: true})}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}/>
                </View>
                <View style={{ alignItems: 'center'}}>
                    <TouchableHighlight onPress={this.gotoNext.bind(this)}>
                        <Text style={{color: 'rgb(255,255,255)', marginBottom: 15, fontSize: 20}}>login</Text>
                    </TouchableHighlight>
                </View>
            </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
            <Text style={{color: 'rgba(96,96,96,1)', fontSize: 16, marginRight: 6}}>no account?</Text>
            <TouchableHighlight onPress={this.gotoSignup.bind(this)}>
                <Text style={{color: 'rgb(255,255,255)', fontSize: 16}}>sign up</Text>
            </TouchableHighlight>
        </View>

      </View>
    );
  }

    gotoSignup() {
        this.props.navigator.push({
           id: 'SignupPage',
           sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
        });
    }

    gotoNext() {
        this.props.navigator.push({
            id: 'MainPage',
           sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
        });
    }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return null;
  }
};

module.exports = LoginPage;
