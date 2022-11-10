import React, { Component } from 'react'
import {View, Button, Text, TextInput, StyleSheet } from 'react-native'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { KeyboardAvoidingView } from 'react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';


//need a constructor because need to initialize the component
export class Login extends Component {
    constructor(props){
        super(props);

        //deciding what the user needs to enter in order to register
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignIn = this.onSignIn.bind(this)
        //in order to access the state vars need to bind the onSignIn
        //function to the state variable
    }

    

    onSignIn(){
        const { email, password, name } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

      <View style = {styles.inputContainer}>
          <TextInput
            placeholder='Name'
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            placeholder='Email'
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry = {true}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
          />
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress = {() => this.onSignIn()}
              style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

         
          </View>
      </KeyboardAvoidingView>
    )
  }
}
export default Login

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: '#E31C79',
    width: '160%',
    height: 40,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  }
})