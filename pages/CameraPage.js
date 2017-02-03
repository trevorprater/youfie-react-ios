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
import RNFetchBlob from 'react-native-fetch-blob'
const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class CameraPage extends Component {
  componentWillMount() {
      this.state = {cameraType: 'back'};
      this.state.faceHeight = 0;
      this.state.faceWidth = 0;
      this.state.faceX = 0;
      this.state.faceY = 0;
      this.state.faceBoxWidth = 0;
      //this.state.flashLogo = '../assets/no-flash.png';
  }
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navigationBarClear}
                routeMapper={NavigationBarRouteMapper} />
          } >
        </Navigator>
    );
  }
  renderScene(route, navigator) {
      return (
      <View style={cameraStyles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}

          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
          style={cameraStyles.preview}
          type={this.state.cameraType}
          defaultOnFocusComponent={false}
          onFaceDetected={this.drawFace.bind(this)}
        >
      </Camera>
      <View style={{zIndex: 1, position: 'absolute', height: this.state.faceHeight, width: this.state.faceWidth, marginTop: this.state.faceY, marginLeft: this.state.faceX, borderWidth: this.state.faceBoxWidth, borderColor:  styles.constants.youfieColor, borderStyle: 'dashed'}}/>
        <View style={{zIndex: 2, alignItems: 'center', flexDirection: 'row', backgroundColor: 'black', padding: 10, borderTopWidth: 4, borderTopColor: 'gray'}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.switchFlash.bind(this)}>
            <Image
                source={require('../assets/no-flash.png')}
                style={cameraStyles.flash}
          />
          </TouchableOpacity>

        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Text
                style={cameraStyles.capture}
                onPress={this.takePicture.bind(this)}>youfie
            </Text>
        </View>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={{flex: 0, justifyContent: 'flex-end'}}
              onPress={this.rotateCamera.bind(this)}>
                <Image
                   source={require('../assets/reverse-camera-youfie-icon2.png')}
                   style={cameraStyles.type}
                />
            </TouchableOpacity>
        </View>
        </View>
    </View>
      );}
    drawFace(event) {
        if (event.bounds) {
            this.setState({
                faceHeight: parseInt(event.bounds.size.height),
                faceWidth: parseInt(event.bounds.size.width),
                faceX: parseInt(event.bounds.origin.x),
                faceY: parseInt(event.bounds.origin.y),
                faceBoxWidth: 2
            })
        } else {
            this.setState({
                faceHeight: 0,
                faceWidth: 0,
                faceX: 0,
                faceY: 0,
                faceBoxWidth: 0
        })
        }
    }

    takePicture() {
        this.camera.capture().then((imgPath) => {
            imgPath = imgPath['path'].replace('file://','');
			RNFetchBlob.fs.readFile(imgPath, 'base64').then((imgB64) => { 
				this.gotoPhotoPage(imgPath, imgB64);
			})  
        }).catch(err =>
            console.error(err)
		);
    }

    rotateCamera() {
        if (this.state.cameraType === 'front') {
            this.setState({cameraType: 'back', faceWidth: 0, faceHeight: 0});
        } else {
            this.setState({cameraType: 'front', faceWidth: 0, faceHeight: 0});
        }
    }

    switchFlash() {
        if (this.state.flashLogo === '../assets/no-flash.png') {
            this.setState({flashLogo: '../assets/flash.png'})
        } else {
            this.setState({flashLogo: '../assets/no-flash.png'})
        }
    }

    gotoPhotoPage(imgPath, imgB64) {
        this.props.navigator.push({
            id: 'PhotoPage',
            name: 'photo page',
            imgPath: imgPath,
			imgB64: imgB64,
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
  },
  preview: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
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
  },
  type: {
      flex: 0,
      width: 40,
      height: 40,
  },
  flash: {
      flex: 0,
      width: 30,
      height: 30,
  }
});

module.exports = CameraPage;
