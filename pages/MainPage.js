'use strict';
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    Navigator,
    TouchableOpacity,
    Dimensions,} = ReactNative;
var React = require('react');
var {Component} = React;
const styles = require('../styles.js')
import Camera from 'react-native-camera'

class MainPage extends Component {
  //constructor(props) {
  //    console.log('executing consturctor')
  //    super(props);
  //    this.state = {cameraType: 'back'};
  //}
  componentWillMount() {
      this.state = {cameraType: 'back'};
  }
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          firebase={this.props.firebase}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navigationBarClear}
                routeMapper={NavigationBarRouteMapper} />
          } >
        </Navigator>
    );
  }
  renderScene(route, navigator) {
      console.log('rendering scene...')
      return (
      <View style={cameraStyles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}

          style={cameraStyles.preview}
          aspect={Camera.constants.Aspect.stretch}
          type={this.state.cameraType}>
          <Text
            style={cameraStyles.capture}
            onPress={this.takePicture.bind(this)}>youfie
          </Text>
          <TouchableOpacity style={{flex: 0, justifyContent: 'flex-end'}}
              onPress={this.rotateCamera.bind(this)}>
            <Image
                source={require('../assets/reverse-camera-youfie-icon2.png')}
                style={cameraStyles.type}
            />
          </TouchableOpacity>
        </Camera>
      </View>
      );}

    takePicture() {
        this.camera.capture().then((data) => 
            console.log(data)).catch(err =>
                console.error(err));
        this.gotoPersonPage()
    }

    rotateCamera() {
        if (this.state.cameraType === 'front') {
            this.setState({cameraType: 'back'});
        } else {
            this.setState({cameraType: 'front'});
        }
        console.log('using' + this.state.cameraType +  'camera');
        console.log('rotating camera')
        //this.render()
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
        <Image
            source={require('../assets/youfie-settings-icon.png')}
            style={styles.navigationBarIcon}
        />
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
      return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Image
            source={require('../assets/youfie-chat-icon.png')}
            style={styles.navigationBarIcon}
        />
      </TouchableOpacity>
      );
  },
  Title(route, navigator, index, navState) {
      return null
  }
}
const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0)', 
    borderColor: 'rgba(96,96,96,1)',
    textAlign: 'center',
    borderWidth: 4,
    borderRadius: 50,
    color: styles.constants.youfieColor,
    fontSize: 25,
    fontFamily: 'Avenir Light',
    paddingTop: 30,
    paddingBottom: 0,
    marginBottom: 30,
  },
  type: {
      flex: 0,
      width: 50,
      height: 50,
  },
});

module.exports = MainPage;
