import React, { Component } from 'react';
import {useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    View,
    Button,
    Image,
    Alert,
    TouchableHighlight,
    ImageBackground,
    ScrollView,
    SafeAreaView
  } from 'react-native';

  import * as Font from 'expo-font';

  import {YuseiMagic_400Regular } from '@expo-google-fonts/yusei-magic';
  import {Righteous_400Regular } from '@expo-google-fonts/righteous';


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

  const all_swimmer_user_info = ["steady_25_pace", "steady_50_pace", "steady_100_pace", "swimmer_experience_level", "fly_pace", "backstroke_pace",
  "breaststroke_pace","IM_pace","max_comfy_dist"];

  const all_runner_user_info = ["steady_mile_pace", "runner_experience_level"]

export class CardioMenu extends Component {

    componentDidMount(){
       // this.props.fetchUser();
        this.loadFonts();
    }

    constructor(props) {
        super(props);

        //deciding what the user needs to enter in order to register
        this.state = {
            type_of_cardio: 'null',
            all_swimmer_info_entered: false,
            current_user: 'null'
        }
        this.onGenerateWorkout = this.onGenerateWorkout.bind(this)
        //in order to access the state vars need to bind the onSignUP
        //function to the state variable
    } 

    async loadFonts(){
        await Font.loadAsync({
          YuseiMagic_400Regular,
          Righteous_400Regular
        });
        this.setState({ fontsLoaded: true});
      }

    onGenerateWorkout (cardio_type) {
           
        let next_page = "";
        if (cardio_type== "Swimming Workout") {
            if (this.state.all_swimmer_info_entered == false) {
        
                next_page = "New Swimmer"
            }
            next_page = "Swim Workout Menu";

        }else if (cardio_type == "Running Workout") {
            next_page = "Run Workout Menu";
        }else{
            next_page = "Bike Workout Menu";
        }
        this.props.navigation.navigate(next_page,
            {current_user: this.state.current_user})
            
            
        
    }


  render() {
    const curr_user = this.props.currentUser;
        if (curr_user != null) {

             this.state.current_user = curr_user;
             let curr_data;
             this.state.all_swimmer_info_entered = true;
             for (let i = 0; i < all_swimmer_user_info.length; i++){

                 curr_data = all_swimmer_user_info[i];
                 if (curr_data!= undefined && curr_user[curr_data]== undefined){
                    this.state.all_swimmer_info_entered = false;
                }
             }

        //console.log('user doc', firebase.firestore().collection("users").doc(curr_user.uid));
        //curr_user["steady_50_pace"] = 1;
        //firebase.firestore().collection("users").doc(curr_user.uid).set(curr_user);
        }
    
    return (
        
        
        <ImageBackground
        source={require('../../FitnessAppBackgrounds/CardioMenuBackground.jpg')}
        resizeMode="cover"
        imageStyle={{opacity: 0.8}}
        style = {styles.CardioImageBackground}
        >  
        <ScrollView> 
                            <View style={styles.CardioIntroContainer}>
                                    <Text style={[styles.CardioIntroText, {fontFamily: 'Righteous_400Regular'}]}>Choose Your Cardio</Text>
                            </View>

                        <View style={styles.CardioButtonContinaer}>
                            <ImageBackground
                                source={require('../../FitnessAppBackgrounds/RunButtonBackground.jpg')}
                                resizeMode="cover"
                                imageStyle={styles.BackgroundImageStyle}
                                style = {styles.ImageBackground}
                            >          
                                <View style={styles.buttonContainer} >

                                            <TouchableOpacity
                                                onPress={() => this.onGenerateWorkout("Running Workout")}
                                                style={styles.CardioButton}
                                            >
                                            <Image 
                                                source={require('../../FitnessAppPics/RunFigure.png')} 
                                                style={styles.RunImage}
                                            />
                                            </TouchableOpacity>
                                        </View>
                            </ImageBackground>
                            <ImageBackground
                                source={require('../../FitnessAppBackgrounds/BikingButtonBackground.jpg')}
                                resizeMode="cover"
                                imageStyle={styles.BackgroundImageStyle}
                                style = {styles.ImageBackground}
                            >
                                <View style={styles.buttonContainer} >

                                        <TouchableOpacity
                                                onPress={() => this.onGenerateWorkout("Biking Workout")}
                                                style={styles.CardioButton}
                                            >
                                                <Image 
                                                source={require('../../FitnessAppPics/BikeFigure.png')} 
                                                style={styles.BikeImage}
                                            />
                                            </TouchableOpacity>
                                </View>
                            </ImageBackground>
                            <ImageBackground
                                source={require('../../FitnessAppBackgrounds/SwimButtonBackground.jpg')}
                                resizeMode="cover"
                                imageStyle={styles.BackgroundImageStyle}
                                style = {styles.ImageBackground}
                            >
                                <View style={styles.buttonContainer} >

                                        <TouchableOpacity
                                                onPress={() => this.onGenerateWorkout("Swimming Workout")}
                                                style={styles.CardioButton}
                                            >
                                                <Image 
                                                source={require('../../FitnessAppPics/SwimFigure.png')} 
                                                style={styles.BikeImage}
                                            />
                                            </TouchableOpacity>
                                </View> 
                            </ImageBackground>

                        </View>                        
                </ScrollView>
                </ImageBackground> 
    )
  }
}


export default connect(mapStateToProps, mapDispatchProps) (CardioMenu)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    CardioImageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    BackgroundImageStyle: {
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
    CardioIntroContainer: {
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
    CardioIntroText:{
        fontSize: 30,
        padding: 15,
        color: 'black',
        textAlign: 'center',
    },
    buttonContainer:{
        alignItems: 'center'
    },
    CardioButtonContinaer:{
        flex: 1,
    },
    CardioButton: {
        backgroundColor: 'white',
        borderColor: '#00008B',
        borderWidth: 6,
        width: 200,
        height: 200,
        borderRadius: 120,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    CardioButtonText: {
        color: '#ff084a',
        fontWeight: '800',
        fontSize: 20,
        padding: 5

    },
    TypeCardioText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: '800',
        color: 'white',
        marginBottom: 20,
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10
    },
    RunImage:{
        width: 125,
        height: 125,
        marginTop: 30,
        marginLeft: 10
    },
    BikeImage:{
        width: 125,
        height: 125,
        marginTop: 30,
        marginLeft: 2
    },
    SwimImage: {
        width: 125,
        height: 125,
        marginTop: 30,
        marginLeft: 2
    }

})