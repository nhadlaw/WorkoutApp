import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
    ImageBackground

  } from 'react-native';

import {Righteous_400Regular } from '@expo-google-fonts/righteous';
import * as Font from 'expo-font'

export class TypeOfWorkout extends Component {

  componentDidMount(){
    this.loadFonts();
  }

  async loadFonts(){
    await Font.loadAsync({
      Righteous_400Regular
    });
    this.setState({ fontsLoaded: true});
  }

  render() {
    return (     
      <ImageBackground
      source ={require('../../FitnessAppBackgrounds/TypeWorkoutBackground3.jpg')}
      imageStyle={{opacity:0.6}}
      style={styles.pageBackground}>
             <ScrollView> 

          <View style={styles.TypeWorkoutButtonContainer}>
                         
                      <View style={styles.TypeOfWorkoutContainer}>
                          <TouchableOpacity
                              style={styles.TypeIntroButton}
                              >
                              
                              <Text style={[styles.CardioIntroText, {fontFamily: 'Righteous_400Regular'}]}>What Type of Workout?</Text>

                          </TouchableOpacity>
                      </View>
                      <ImageBackground
                              source={require('../../FitnessAppPics/CardioPhoto.jpg')}
                              resizeMode="cover"
                              imageStyle={{borderRadius: 10, opacity: 0.8}}
                              style = {styles.CardioMenuBackground}
                          >           
                              <View style={styles.buttonContainer} >

                                          <TouchableOpacity
                                              onPress={() => this.props.navigation.navigate("Cardio Menu")}
                                              style={styles.MenuButton}
                                          >                                          
                                          <Text style={[styles.TypeWorkoutText, {fontFamily: 'Righteous_400Regular'}]}>Cardio</Text>

                                          </TouchableOpacity>
                                      </View>
                          </ImageBackground>
                          <ImageBackground
                              source={require('../../FitnessAppPics/StrengthPhoto.jpg')}
                              resizeMode="cover"
                              imageStyle={{borderRadius: 10, opacity: 0.8}}
                              style = {styles.LiftingMenuBackground}
                          >
                              <View style={styles.buttonContainer} >

                                      <TouchableOpacity
                                              onPress={() => this.props.navigation.navigate("Lifting Menu")}
                                              style={styles.MenuButton}
                                          >
                                          <Text style={[styles.TypeWorkoutText, {fontFamily: 'Righteous_400Regular'}]}>Strength</Text>
                                          </TouchableOpacity>

                              </View>
                          </ImageBackground>
                          <ImageBackground
                              source={require('../../FitnessAppPics/RecoveryPhoto.jpg')}
                              resizeMode="cover"
                              imageStyle={{borderRadius: 10, opacity: 0.8}}
                              style = {styles.RecoveryMenuBackground}
                          >
                              <View style={styles.buttonContainer} >

                                      <TouchableOpacity
                                              onPress={() => this.props.navigation.navigate("Recovery Menu")}
                                              style={styles.MenuButton}
                                          >
                                          <Text style={[styles.TypeWorkoutText, {fontFamily: 'Righteous_400Regular'}]}>Recovery</Text>
                                          </TouchableOpacity>
                              </View> 
                          </ImageBackground>

            </View>   
          </ScrollView>
          </ImageBackground>
                     
                      
  )
}
}


export default TypeOfWorkout

const styles = StyleSheet.create({
  pageBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
  },

  TypeOfWorkoutContainer: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: 'black',
    borderRightWidth: 3,
    borderLeftWidth:3,
    borderBottomWidth: 10,
  },
  CardioMenuBackground: {
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'white',
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOpacity: 0.8,
      elevation: 30,
      shadowRadius: 15 ,
  },
  LiftingMenuBackground: {
    alignItems: 'center',
      borderWidth: 3,
      borderColor: 'white',
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOpacity: 0.8,
      elevation: 30,
      shadowRadius: 15 ,
  },
  RecoveryMenuBackground: {
    alignItems: 'center',
      borderWidth: 3,
      borderColor: 'white',
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOpacity: 0.8,
      elevation: 30,
      shadowRadius: 15 ,
  },
  CardioIntroText:{
      paddingRight: 40,
      paddingLeft: 40,
      fontSize: 30,
      color: '#197C9B',
      textAlign: 'center',
  },
  TypeIntroButton: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor:'rgba(255, 255, 255, 0.9)',
    borderRadius: 10
  },
  buttonContainer:{
      alignItems: 'center'
  },
  TypeWorkoutButtonContainer:{
      flex: 1,
  },
  MenuButton: {
      backgroundColor: 'rgba(160, 233, 233, .8)',
      borderColor: 'white',
      borderWidth: 2,
      width: 125,
      height: 100,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30
  },
  TypeWorkoutText: {
    color: '#197C9B',
    fontSize: 20,
    paddingTop: 30,
    fontWeight: "800",
    textAlign: 'center',
  },


})