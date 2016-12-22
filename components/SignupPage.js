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

class SignupPage extends Component {
  componentWillMount() {
      this.state = {
        email: 'email',
        password: 'password',
        confirmPassword: 'confirm password',
        passwordTextHidden: false,
        confirmPasswordTextHidden: false
      };
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
                        style={{borderColor: 'rgba(96,96,96,0.3)', marginBottom: 5, borderWidth: 1, borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50,width: 300, color: 'rgba(0,0,0,0.5)'}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        blurOnSubmit={true}
                        keyboardType={'email-address'}
                        maxLength={50}
                        onFocus={() => this.setState({email: ''})}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}/>

                    <TextInput
                        style={{borderColor: 'rgba(96,96,96,0.3)', marginBottom: 5, borderWidth: 1, borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50, width: 300, color: 'rgba(0,0,0,0.5)'}}
                        autoCapitalize={'none'}
                        secureTextEntry={this.state.passwordTextHidden}
                        autoCorrect={false}
                        blurOnSubmit={true}
                        keyboardType={'default'}
                        maxLength={50}
                        onFocus={() => this.setState({password: '', passwordTextHidden: true})}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}/>

                    <TextInput
                        style={{borderColor: 'rgba(96,96,96,0.3)', marginBottom: 20, borderWidth: 1,borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50, width: 300, color: 'rgba(0,0,0,0.5)'}}
                        autoCapitalize={'none'}
                        secureTextEntry={this.state.confirmPasswordTextHidden}
                        autoCorrect={false}
                        blurOnSubmit={true}
                        keyboardType={'default'}
                        maxLength={50}
                        onFocus={() => this.setState({confirmPassword: '', confirmPasswordTextHidden: true})}
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={this.state.confirmPassword}/>
                </View>
                <View style={{ alignItems: 'center'}}>
                    <TouchableHighlight onPress={this.gotoLogin.bind(this)}>
                        <Text style={{color: 'rgb(255,255,255)', marginBottom: 15, fontSize: 20}}>create account</Text>
                    </TouchableHighlight>
                </View>
            </View>
      </View>
    );
  }
  gotoLogin() {
    this.props.navigator.pop()
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
      return(
          <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{color: 'white', margin: 10, fontSize: 16}}>back</Text>
          </TouchableOpacity>
      )
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return null;
  }
};

module.exports = SignupPage;
