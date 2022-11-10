import React, { Component } from 'react'
import {View, Button, TextInput, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

import { connect } from 'react-redux';
import { fetchUser } from '../../redux/reducers/users';
import { getAuth } from "firebase/auth";


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
}

//this adds a function property to the screen that will dispatch
//the fetchUser action 
const mapDispatchProps = (dispatch) => 
{
  return{
    fetchUser: () => dispatch(fetchUser())
  }
}



//need a constructor because need to initialize the component
export class Register extends Component {

    constructor(props){
        super(props);

        //deciding what the user needs to enter in order to register
        this.state = {
            email: '',
            password: '',
            name: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
        //in order to access the state vars need to bind the onSignUP
        //function to the state variable
    }

    

    async onSignUp(){
        const { email, password, name } = this.state;  
        try {
          const userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
          console.log('user Auth id', userAuth);
          this.props.navigation.navigate("Personal Quiz", {user_id: userAuth.user.uid, user_email: userAuth.user.email, user_name: name})
        } catch (error){
          console.log('error is', error.message);
        }

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
              onPress = {() => this.onSignUp()}
              style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

         
          </View>
        </KeyboardAvoidingView>
      )
    }

  }

//This allows us to access fetchUser in components
export default connect(mapStateToProps, mapDispatchProps) (Register)

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
    marginTop:40
  },
  button: {
    backgroundColor: '#E31C79',
    width: '40%',
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
});