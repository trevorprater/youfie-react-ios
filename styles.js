const React = require('react-native')
const {StyleSheet} = React
const constants = {
  youfieColor: 'rgb(62,208,215)'
};

var styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: constants.youfieColor,
        alignItems: 'center',
    },
    youfieLogo: {
        color: 'rgba(255,255,255,1)',
        fontSize: 88,
        fontFamily: 'Avenir Light'
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
