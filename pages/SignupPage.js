'use strict';

var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Image,
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
        confirmPasswordTextHidden: false,
        signupMessage: '',
        accountCreated: false,
      };
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          firebase={this.props.firebase}
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
                <Text style={{color: 'red', fontSize: 14}}>{this.state.signupMessage}</Text>
            <View style={{flex:3, justifyContent: 'flex-start'}}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between'}}>

                    <TextInput
                        style={{backgroundColor: 'rgba(255,255,255,0.6)',borderColor: 'rgba(96,96,96,0.5)', marginBottom: 5, borderWidth: 1, borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50,width: 300, color: 'rgba(96,96,96,0.8)'}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        blurOnSubmit={true}
                        keyboardType={'email-address'}
                        maxLength={50}
                        onFocus={() => this.setState({email: ''})}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}/>

                    <TextInput
                        style={{backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(96,96,96,0.5)', marginBottom: 5, borderWidth: 1, borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50, width: 300, color: 'rgba(96,96,96,0.8)'}}
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
                        style={{backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(96,96,96,0.5)', marginBottom: 20, borderWidth: 1,borderStyle: 'dashed',  alignSelf: 'stretch', textAlign: 'center', height: 50, width: 300, color: 'rgba(96,96,96,0.8)'}}
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

    _formatErr(errMessage) {
        return errMessage.split(':')
            .pop()
            .replace('.', '')
            .toLowerCase()
            .replace('the', '')
            .replace('by another account', '')
            .trim()
    }

    async signup(email, password1, password2) {
        if (email === '') {
            this.setState({signupMessage: "enter an email address"})
            return
        }
        if (password1 === '') {
            this.setState({signupMessage: "enter a password"})
            return
        }
        if (password2 === '') {
            this.setState({signupMessage: "confirm your password"})
            return
        }
            
        if (password1 !== password2) {
            this.setState({signupMessage: "passwords do not match"})
            return
        }

        try {
            await this.props.firebase.auth()
            .createUserWithEmailAndPassword(email.trim(), password1);
            await this.setState({accountCreated: true})
        } catch (error) {
            this.setState({signupMessage: this._formatErr(error.toString())})
        }
    }

    async gotoLogin() {
        this.setState({signupMessage: ''})
        await this.signup(this.state.email,
            this.state.password, 
            this.state.confirmPassword)

        if (this.state.accountCreated) { 
            this.props.navigator.pop()
        }
    }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
      return(
          <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => navigator.parentNavigator.pop()}>
              <Image
                source={require('../assets/backarrow-youfie-logo.png')}
                style={{width: 20, height: 20, marginLeft: 10, marginTop: 3}}
              />
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
