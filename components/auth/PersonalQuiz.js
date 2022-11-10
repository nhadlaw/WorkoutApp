import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
  } from 'react-native';

import { connect } from 'react-redux';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";



import { fetchUser } from '../../redux/reducers/users';


//this will allow us to access this.props.currentUser
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

/*
export default function PersonalQuiz({navigation}){
  componentDidMount(){

  }
}*/

export class PersonalQuiz extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  constructor(props){
    super(props);

    //deciding what the user needs to enter in order to register
    this.state = {
        age: '',
        sex: '',
        weight: ''
    }
    this.EnterBasics = this.EnterBasics.bind(this)

    //in order to access the state vars need to bind the onSignUPs
    //function to the state variable
  }

  writeUserData(user){
    firebase.firestore().collection("users")
                .doc(user.uid)
                .set(user)
  }


  EnterBasics(new_user_id, new_user_email, new_user_name, goal) {
    var user = {
      name: new_user_name,
      uid: new_user_id,
      email: new_user_email,
      age: this.state.age,
      sex: this.state.sex,
      weight: this.state.weight,
      fitness_goal: goal
    }
    console.log('user in personal quiz is', user);
    this.writeUserData(user);
    this.props.fetchUser();
    this.props.navigation.navigate("Main");
  }


  render() {
    
    const new_user_id = this.props.route.params.user_id;
    const new_user_email = this.props.route.params.user_email;
    const new_user_name = this.props.route.params.user_name;
    return (
      <>   
        <Text>Let's get to know a little more about you! </Text>
        <TextInput
            placeholder='age'
            onChangeText={(age) => this.setState({ age })}
          />
          <TextInput
            placeholder='sex'
            onChangeText={(sex) => this.setState({ sex })}
          />
          <TextInput
            placeholder='current weight'
             onChangeText={(weight) => this.setState({ weight })}
          />
          <Text> What is your fitness goal?</Text>
          <View>
              <Button
                onPress = {() => this.EnterBasics(new_user_id, new_user_email, new_user_name, 'workouts')}
                title = "I want workouts"
              />
              <Button
                onPress = {() => this.EnterBasics(new_user_id, new_user_email, new_user_name, 'fitness plan')}
                title = "I want a fitness plan"
              />
          </View>
          
      </>
      
    )
  }
}


//This allows us to access fetchUser in components
export default connect(mapStateToProps, mapDispatchProps) (PersonalQuiz)