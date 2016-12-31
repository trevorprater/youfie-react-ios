const React = require('react-native')
const {StyleSheet} = React
const constants = {
  youfieColor: 'rgb(62,208,215)'
};

var styles = StyleSheet.create({
    navigationBarOpaque: {
        backgroundColor: 'rgba(0,0,0,1)',
        alignItems: 'center',
        height: 65,
    },
    navigationBarClear: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        alignItems: 'center',
        height: 50,
    },
    navigationBarText: {
        fontSize: 18,
        color: constants.youfieColor,
        fontFamily: 'Avenir Light',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    navigationBarIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
    },
    signupBarIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
    },


    youfieLogo: {
        color: 'rgba(255,255,255,1)',
        fontSize: 88,
        fontFamily: 'Avenir Light',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },  
    welcome: {
        fontSize: 20, 
        textAlign: 'center',
        margin: 10, 
    },  
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },  
})

module.exports = styles
module.exports.constants = constants;
