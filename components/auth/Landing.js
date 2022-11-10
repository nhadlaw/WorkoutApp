import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'

export class Landing extends Component {
  render() {
    


    return (
        <View style= {styles.container}>
          <Text style ={styles.AppNameText}>Welcome to Not Your Regular Fitness App!</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
                style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
                style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
  }
}

export default Landing

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ''
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
  },
  button: {
    backgroundColor: '#E31C79',
    width: '60%',
    pading: 15,
    marginTop: 15,
    height: 40,
    borderRadius: 7,
    alignItems: 'center'
  },
  buttonText: {
    padding: 5,
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  },
  AppNameText:{
    fontSize: 20,
    marginBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center'
  }
});


