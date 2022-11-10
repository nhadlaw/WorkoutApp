import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


import { Provider } from 'react-redux';
import { store } from './redux/reducers/users.js'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjMfCsbv3K6GfTvFlPwNCZMMtZg-qcMcc",
  authDomain: "fitnessapp-2ac9c.firebaseapp.com",
  projectId: "fitnessapp-2ac9c",
  storageBucket: "fitnessapp-2ac9c.appspot.com",
  messagingSenderId: "17233897241",
  appId: "1:17233897241:web:2d022a31642c7ccad38788",
  measurementId: "G-X52CB75NE2"
};

//making sure we aren't running any firebase at the moment
if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import PersonalQuizScreen from './components/auth/PersonalQuiz'
import TypeOfWorkoutScreen from './components/workouts/TypeOfWorkout'
import CardioMenuScreen from './components/workouts/CardioMenu'
import LiftingMenuScreen from './components/workouts/LiftingMenu'
import DisplaySwimmingWorkoutScreen from './components/workouts/CardioWorkouts/Swimming/SwimmingWorkout'
import DisplayRunningWorkoutScreen from './components/workouts/CardioWorkouts/Running/RunningWorkout'
import SwimmingWorkoutConfirmedScreen from './components/workouts/CardioWorkouts/Swimming/SwimmingWorkoutConfirmed'
import NewUserSwimInfoScreen from './components/NewUserInfo/NewUserSwimInfo'
import SwimWorkoutMenuScreen from './components/workouts/CardioWorkouts/Swimming/SwimWorkoutMenu'
import RunWorkoutMenuScreen from './components/workouts/CardioWorkouts/Running/RunWorkoutMenu'
import SaveToCameraRollScreen from './components/SaveToCameraRoll'

const Stack = createStackNavigator();


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      new_user: false
    }
  }



  componentDidMount(){
    //show a loading screen while the auth is still loading
    firebase.auth().onAuthStateChanged(async (user) => {
      
      if (!user){
        this.setState({
          loggedIn: false,
          loaded:true,
          new_user:false
        })
      }else{

        const curr_user = getAuth().currentUser;
        const docRef = doc(db, "users", curr_user.uid);
        const docSnap = await getDoc(docRef);
        var age = undefined;
        var just_registered = false;

        console.log('current user in app js', curr_user);
        if (docSnap.exists()) {
          var doc_data = docSnap.data()
          console.log("Document data:", doc_data);

          age = doc_data['age'];
          if ((age === undefined)){
            just_registered = true;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        this.setState({
          loggedIn:true,
          loaded: true,
          new_user: just_registered
        })
        
      }
    })
  }

  render() {
    const  {loggedIn, loaded, new_user} = this.state;
    if (!loaded){
      return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              Loading ...
            </Text>

        </View>
      )
    }

    var route_name = "Landing";
    if (!loggedIn){
      route_name = "Landing";
    }else if(new_user){
      route_name = "Personal Quiz";
    }else{
      route_name = "Main"
      //route_name = "Cardio Menu"; //for now it's swimming, change back to main when done with swimming
    }
    //Firt checks if the current user is either not logged in or not an existing user
      
      return (
        <Provider store = {store}>

        <NavigationContainer>
        <Stack.Navigator initialRouteName={route_name}>
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
            <Stack.Screen name="Personal Quiz" component={PersonalQuizScreen}/>
            <Stack.Screen name="Choose Workout" component={TypeOfWorkoutScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Cardio Menu" component={CardioMenuScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Lifting Menu" component={LiftingMenuScreen}/>
            <Stack.Screen name="Running Workout" component={DisplayRunningWorkoutScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Swimming Workout" component={DisplaySwimmingWorkoutScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Swimming Workout Confirmed" component={SwimmingWorkoutConfirmedScreen} options={{headerShown: false}}/>
            <Stack.Screen name="New Swimmer" component={NewUserSwimInfoScreen}/>
            <Stack.Screen name="Swim Workout Menu" component={SwimWorkoutMenuScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Run Workout Menu" component={RunWorkoutMenuScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Save To Camera Roll" component={SaveToCameraRollScreen} options={{headerShown: true}}/>

        </Stack.Navigator>
      </NavigationContainer>
        </Provider>
      );
    
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });

  }
}