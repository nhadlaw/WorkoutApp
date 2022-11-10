import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    ScrollView,
    Text,
    View,
    Button,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Image
  } from 'react-native';

import { connect } from 'react-redux';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import {Righteous_400Regular } from '@expo-google-fonts/righteous';
import * as Font from 'expo-font'



import { fetchUser } from '../redux/reducers/users';

export class CompletedWorkout extends Component {
  render() {
    return (
     <Text>
         Completed Workout
     </Text>
    )
  }
}

export default CompletedWorkout