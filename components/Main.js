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

//this.props.fetchUser() is allowed by mapDispatchprops
//currentUser = this.props is allowed by mapStateToProps

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

export class Main extends Component {
  componentDidMount(){
    this.props.fetchUser();
    this.loadFonts();
  }

  async loadFonts(){
    await Font.loadAsync({
      Righteous_400Regular
    });
    this.setState({ fontsLoaded: true});
  }

  render(){
    console.log('curr user in main', this.props.currentUser);
    const curr_user = this.props.currentUser;
    //might need to find a better way to work around this
    if (curr_user == undefined){
      return (
      <View>
        <Text>No user found, Please try re-logging in</Text>
      </View>
      )

    }else{
      return (
           <ImageBackground 
            source={require('../FitnessAppBackgrounds/MainPageBackground.jpg')}
            resizeMode="cover"
            imageStyle={{opacity: 0.5, height: '100%',width: '100%'}}
            style = {styles.ImageBackground}
            >

              <ScrollView style={styles.ScrollBackground}>
                  <View style={styles.WelcomeContainer}>
                    <View style={styles.WelcomeTextContainer}>
                      <Text style={[styles.WelcomeText, {fontFamily: 'Righteous_400Regular'}]}>Welcome {curr_user.name}!</Text>   
                    </View>
                    <TouchableOpacity
                        style={styles.ProfileButton}
                      >
                        <Image 
                            source={require('../FitnessAppPics/UserProfileTemp.jpg')} 
                            style={styles.UserProfileImage}
                        />
                      </TouchableOpacity>
                  </View>

                  <View style={styles.otherOptions}>
                      <Text style={[styles.AdventureText, {fontFamily: 'Righteous_400Regular'}]}>Ready for your next adventure?</Text> 
                        <TouchableOpacity 
                            style={styles.NewWorkoutButton}
                            onPress={() => this.props.navigation.navigate("Choose Workout")}>
                            
                              <Text style={[styles.otherOptionButtonText, {fontFamily: 'Righteous_400Regular'}]}>Start a New Workout</Text>
                          </TouchableOpacity> 
                          <TouchableOpacity 
                            style={styles.WorkoutLibraryButton}>
                              <Text style={[styles.otherOptionButtonText, {fontFamily: 'Righteous_400Regular'}]}>Go to Workout Library</Text>
                          </TouchableOpacity> 
                          <TouchableOpacity 
                            style={styles.ChangePlanButton}>
                              <Text style={[styles.otherOptionButtonText, {fontFamily: 'Righteous_400Regular'}]}>Change my Plan</Text>
                          </TouchableOpacity> 
                  </View>
                  </ScrollView>
          </ImageBackground>
      )
    }
    
  }

}

export default connect(mapStateToProps, mapDispatchProps) (Main)

const styles = StyleSheet.create({
  ImageBackground:{
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1
  },
  ScrollBackground: {
    flex: 1
  },
  WelcomeContainer:  {
    marginTop: 100,
    alignItems: 'center',
  },
  otherOptions: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 15,
    marginTop: 130,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  WelcomeTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#62B69D',
  },
  NewWorkoutButton: {
    backgroundColor: '#BC3CE9',
    borderColor: '#35584D',
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: 215,
  },
  WorkoutLibraryButton: {
    backgroundColor: '#257F9B',
    borderColor: '#1FA47C',
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: 215,
  },
  ChangePlanButton: {
    backgroundColor: '#32A180',
    borderColor: '#35584D',
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: 215,
  },
  otherOptionButtonText:{
    paddingTop: 15,
    paddingBottom: 15,
    color: 'white',
    fontSize: 15,
    fontWeight: "800",
  },
  NewWorkoutButtonText:{
    padding: 15,
    color: 'white',
    fontSize: 20,
    fontWeight: "800",
  },
  ProfileButton: {
    backgroundColor: '#62B69D',
    borderColor: '#35584D',
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 70,
  },
  WelcomeText:{
    color: '#35584D',
    fontSize: 20,
    padding: 20,
    fontWeight: "800",
    textAlign: 'center',
  },
  AdventureText:{
    color: '#35584D',
    fontSize: 15,
    marginBottom: 20,
    padding: 20,
    fontWeight: "800",
    textAlign: 'center',
  },
  UserProfileImage:{
    width: 140,
    height: 140,
    borderRadius: 67,
    marginTop: 5
},
})