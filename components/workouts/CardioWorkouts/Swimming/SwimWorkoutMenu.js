import React, { Component } from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground} from 'react-native';

import {YuseiMagic_400Regular } from '@expo-google-fonts/yusei-magic';
import { MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';
import * as Font from 'expo-font';
import ButtonList from '../../ButtonList';

import * as SwimColors from '../../../../FitnessAppColors/SwimmingColors';


export class SwimWorkoutMenu extends Component {
    
    constructor(props) {
        super(props);

        //deciding what the user needs to enter in order to register
        this.state = {
            type_of_swim_workout: 'null',
            workout_duration: 'null',
            workout_intensity: 'null',
            current_user: 'null',
            type_swim_workout_error_message: '',
            swim_workout_intensity_error_message: '',
            swim_workout_duration_error_message: '',
            fontsLoaded: false,
            hrt_rate_180_button_color: SwimColors.unclicked_button_color,
            hrt_rate_180_border_color: SwimColors.unclicked_button_color,
            hrt_rate_180_text_color: SwimColors.unclicked_button_text_color,
            distance_free_button_color: SwimColors.unclicked_button_color,
            distance_free_border_color: SwimColors.unclicked_button_color,
            distance_free_text_color: SwimColors.unclicked_button_text_color,
            IM_button_color: SwimColors.unclicked_button_color,
            IM_border_color: SwimColors.unclicked_button_color,
            IM_text_color: SwimColors.unclicked_button_text_color,
            stroke_choice_button_color: SwimColors.unclicked_button_color,
            stroke_choice_border_color: SwimColors.unclicked_button_color,
            stroke_choice_text_color: SwimColors.unclicked_button_text_color,
            kick_button_color: SwimColors.unclicked_button_color,
            kick_border_color: SwimColors.unclicked_button_color,
            kick_text_color: SwimColors.unclicked_button_text_color,
            pull_button_color: SwimColors.unclicked_button_color,
            pull_border_color: SwimColors.unclicked_button_color,
            pull_text_color: SwimColors.unclicked_button_text_color,
            vo2_max_button_color: SwimColors.unclicked_button_color,
            vo2_max_border_color: SwimColors.unclicked_button_color,
            vo2_max_text_color: SwimColors.unclicked_button_text_color,
            speed_50_100_button_color: SwimColors.unclicked_button_color,
            speed_50_100_border_color: SwimColors.unclicked_button_color,
            speed_50_100_text_color: SwimColors.unclicked_button_text_color,
            speed_200_400_button_color: SwimColors.unclicked_button_color,
            speed_200_400_border_color: SwimColors.unclicked_button_color,
            speed_200_400_text_color: SwimColors.unclicked_button_text_color,
            easy_intensity_button_color: SwimColors.unclicked_button_color,
            easy_intensity_border_color: SwimColors.unclicked_button_color,
            easy_intensity_text_color: SwimColors.unclicked_button_text_color,
            medium_intensity_button_color: SwimColors.unclicked_button_color,
            medium_intensity_border_color: SwimColors.unclicked_button_color,
            medium_intensity_text_color: SwimColors.unclicked_button_text_color,
            hard_intensity_button_color: SwimColors.unclicked_button_color,
            hard_intensity_border_color: SwimColors.unclicked_button_color,
            hard_intensity_text_color: SwimColors.unclicked_button_text_color
        }
        this.onGenerateWorkout = this.onGenerateWorkout.bind(this)

        //in order to access the state vars need to bind the onSignUP
        //function to the state variable
    } 

    componentDidMount(){
       // const curr_user = this.props.route.params.current_user;
        this.loadFonts();
        const curr_user = {
            IM_pace: "2",
            age: "",
            backstroke_pace: "1",
            breaststroke_pace: "1.5",
            email: "tgoe@gmail.com",
            fitness_goal: "fitness plan",
            fly_pace: "1",
            max_comfy_dist: "1000",
            name: "toe",
            sex: "",
            steady_25_pace: ".5",
            steady_50_pace: "1",
            steady_100_pace: "1.5",
            swimmer_experience_level: "advanced",
            uid: "iTnECDgo09OkMnrhwL4Yxuuqqu22",
            weight: ""
        }
    
        this.setState({current_user: curr_user});
    }

    async loadFonts(){
        await Font.loadAsync({
          YuseiMagic_400Regular,
          MajorMonoDisplay_400Regular
        });
        this.setState({ fontsLoaded: true});
    }

    onGenerateWorkout(){
            let curr_workout_duration = this.state.workout_duration;
            let valid_workout_duration = true;
            let valid_type = true;
            let valid_intensity = true;
            let float_value = parseFloat(curr_workout_duration);
            if (isNaN(curr_workout_duration) || curr_workout_duration == "null" || curr_workout_duration == ''){
                //not a proper integer
                //find a way to reload the page and give the error message
                valid_workout_duration = false;
                this.setState({swim_workout_duration_error_message: 'Please enter a valid time in minutes'})
            } else {
                if (float_value <= 3 || float_value > 400) {
                    valid_workout_duration = false;
                    this.setState({swim_workout_duration_error_message: 'Please enter a reasonable time in minutes'})
                }
            }
           
            if (this.state.type_of_swim_workout == "null") {
                valid_type = false;
                this.setState({type_swim_workout_error_message: 'Please Choose a Swim Workout Type'})
            }
            if (this.state.workout_intensity == "null") {
                valid_intensity = false;
                this.setState({swim_workout_intensity_error_message: 'Please Choose a Swim Workout Intensity'})
            }
            if (valid_workout_duration && valid_type && valid_intensity) {
                this.props.navigation.navigate("Swimming Workout",
                {type_swim_workout: this.state.type_of_swim_workout, 
                    duration: this.state.workout_duration, 
                    intensity: this.state.workout_intensity,
                    current_user: this.state.current_user});
            }
            
    }

    arrayRemove(arr, value) {
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    
    set_swim_type(type) {
        const all_swim_types = ["hrt_rate_180", "distance_free", "IM", "stroke_choice", 
        "kick", "pull", "vo2_max", "speed_50_100", "speed_200_400"];
       
        const curr_swim_type_button_color = `${type}_button_color`;
        const curr_swim_type_border_color = `${type}_border_color`;
        const curr_swim_type_text_color = `${type}_text_color`;

      
        if (this.state[curr_swim_type_button_color] == SwimColors.clicked_button_color) {        
            this.setState({type_of_swim_workout: "null"});
            this.state[curr_swim_type_button_color] = SwimColors.unclicked_button_color
            this.state[curr_swim_type_border_color] = SwimColors.unclicked_button_color
            this.state[curr_swim_type_text_color] = SwimColors.unclicked_button_text_color
        } else {

            this.setState({type_of_swim_workout: type});
            this.setState({type_swim_workout_error_message: ""});
            this.state[curr_swim_type_button_color] = SwimColors.clicked_button_color;
            this.state[curr_swim_type_border_color] = SwimColors.clicked_button_border_color;
            this.state[curr_swim_type_text_color] = SwimColors.clicked_button_text_color;
            let other_types = this.arrayRemove(all_swim_types, type);

            for (let i = 0; i < other_types.length; i++) {
                let new_type = other_types[i];
                let other_swim_type_button_color = `${new_type}_button_color`;
                let other_swim_type_border_color = `${new_type}_border_color`;
                let other_swim_type_text_color = `${new_type}_text_color`;

                this.state[other_swim_type_button_color] = SwimColors.unclicked_button_color;
                this.state[other_swim_type_border_color] = SwimColors.unclicked_button_color;
                this.state[other_swim_type_text_color] = SwimColors.unclicked_button_text_color;
              
            }

        }     
    }

    set_intensity_type(type) {

        if (type == "medium") {
            if (this.state.medium_intensity_button_color == SwimColors.clicked_button_color) {
                this.setState({workout_intensity: "null"});
                this.setState({medium_intensity_button_color: SwimColors.unclicked_button_color,
                    medium_intensity_border_color: SwimColors.unclicked_button_color,
                    medium_intensity_text_color: SwimColors.unclicked_button_text_color});
            }else {
                this.setState({swim_workout_intensity_error_message: ""});
                this.setState({workout_intensity: type});
                this.setState({medium_intensity_button_color: SwimColors.clicked_button_color,
                               medium_intensity_border_color: SwimColors.clicked_button_border_color,
                               medium_intensity_text_color: SwimColors.clicked_button_text_color});
                this.setState({hard_intensity_button_color: SwimColors.unclicked_button_color,
                               hard_intensity_border_color: SwimColors.unclicked_button_color,
                               hard_intensity_text_color: SwimColors.unclicked_button_text_color});
                this.setState({easy_intensity_button_color: SwimColors.unclicked_button_color,
                               easy_intensity_border_color: SwimColors.unclicked_button_color,
                               easy_intensity_text_color: SwimColors.unclicked_button_text_color});
            }
        }
        if (type == "easy") {
            if (this.state.easy_intensity_button_color == SwimColors.clicked_button_color) {
                this.setState({workout_intensity: ''});
                this.setState({easy_intensity_button_color: SwimColors.unclicked_button_color,
                    easy_intensity_border_color: SwimColors.unclicked_button_color,
                    easy_intensity_text_color: SwimColors.unclicked_button_text_color});
            }else {
                this.setState({swim_workout_intensity_error_message: ""});
                this.setState({workout_intensity: type});
                this.setState({easy_intensity_button_color: SwimColors.clicked_button_color,
                               easy_intensity_border_color: SwimColors.clicked_button_border_color,
                               easy_intensity_text_color: SwimColors.clicked_button_text_color});
                this.setState({medium_intensity_button_color: SwimColors.unclicked_button_color,
                               medium_intensity_border_color: SwimColors.unclicked_button_color,
                               medium_intensity_text_color: SwimColors.unclicked_button_text_color});
                this.setState({hard_intensity_button_color: SwimColors.unclicked_button_color,
                               hard_intensity_border_color: SwimColors.unclicked_button_color,
                               hard_intensity_text_color: SwimColors.unclicked_button_text_color});
            }
        } 
        if (type == "hard") {
            if (this.state.hard_intensity_button_color == SwimColors.clicked_button_color) {
                this.setState({workout_intensity: ''});
                this.setState({hard_intensity_button_color: SwimColors.unclicked_button_color,
                    hard_intensity_border_color: SwimColors.unclicked_button_color,
                    hard_intensity_text_color: SwimColors.unclicked_button_text_color});
            }else {
                this.setState({swim_workout_intensity_error_message: ""});
                this.setState({workout_intensity: type});
                this.setState({hard_intensity_button_color: SwimColors.clicked_button_color,
                               hard_intensity_border_color: SwimColors.clicked_button_border_color,
                               hard_intensity_text_color: SwimColors.clicked_button_text_color});
                this.setState({medium_intensity_button_color: SwimColors.unclicked_button_color,
                               medium_intensity_border_color: SwimColors.unclicked_button_color,
                               medium_intensity_text_color: SwimColors.unclicked_button_text_color});
                this.setState({easy_intensity_button_color: SwimColors.unclicked_button_color,
                               easy_intensity_border_color: SwimColors.unclicked_button_color,
                               easy_intensity_text_color: SwimColors.unclicked_button_text_color});
            }
        } 
    }

    set_duration_input(time) {

        this.setState({ 
            workout_duration: time,
            swim_workout_duration_error_message: ""
        });

        
    }


  render() {
    let button_style = {
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 2.5,
        height: 40,
        borderRadius: 7,
        borderWidth: 5,
        width: '70%',
        alignItems: 'center'
    }
    let touchProps_HrtRate180_Button = {
        style: [{borderColor: this.state.hrt_rate_180_border_color,
            backgroundColor: this.state.hrt_rate_180_button_color}, button_style],
        onPress: () => this.set_swim_type('hrt_rate_180'),
        underlayColor: 'white'
    }
    let touchProps_DistanceFree_Button = {
        style: [{borderColor: this.state.distance_free_border_color,
            backgroundColor: this.state.distance_free_button_color}, button_style],
        onPress: () => this.set_swim_type('distance_free'),
        underlayColor: 'white'
    }
    let touchProps_IM_Button = {
        style: [{borderColor: this.state.IM_border_color,
            backgroundColor: this.state.IM_button_color}, button_style],
        onPress: () => this.set_swim_type('IM'),
        underlayColor: 'white'
    }
    let touchProps_StrokeChoice_Button = {
        style: [{borderColor: this.state.stroke_choice_border_color,
            backgroundColor: this.state.stroke_choice_button_color}, button_style],
        onPress: () => this.set_swim_type('stroke_choice'),
        underlayColor: 'white'
    }
    let touchProps_Kick_Button = {
        style: [{borderColor: this.state.kick_border_color,
            backgroundColor: this.state.kick_button_color}, button_style],
        onPress: () => this.set_swim_type('kick'),
        underlayColor: 'white'
    }
    let touchProps_Pull_Button = {
        style: [{borderColor: this.state.pull_border_color,
            backgroundColor: this.state.pull_button_color}, button_style],
        onPress: () => this.set_swim_type('pull'),
        underlayColor: 'white'
    }
    let touchProps_Speed_50_100_Button = {
        style: [{borderColor: this.state.speed_50_100_border_color,
            backgroundColor: this.state.speed_50_100_button_color}, button_style],
        onPress: () => this.set_swim_type('speed_50_100'),
        underlayColor: 'white'
    }
    let touchProps_Speed_200_400_Button = {
        style: [{borderColor: this.state.speed_200_400_border_color,
            backgroundColor: this.state.speed_200_400_button_color}, button_style],
        onPress: () => this.set_swim_type('speed_200_400'),
        underlayColor: 'white'
    }
    let touchProps_Vo2Max_Button = {
        style: [{borderColor: this.state.vo2_max_border_color,
            backgroundColor: this.state.vo2_max_button_color}, button_style],
        onPress: () => this.set_swim_type('vo2_max'),
        underlayColor: 'white'
    }
    let touchProps_EasyIntensity_Button = {
        style: [{borderColor: this.state.easy_intensity_border_color,
            backgroundColor: this.state.easy_intensity_button_color},button_style, {width: 100}],
        onPress: () => this.set_intensity_type("easy"),
        underlayColor: 'white'
    }
    let touchProps_MediumIntensity_Button = {
        style: [{borderColor: this.state.medium_intensity_border_color,
            backgroundColor: this.state.medium_intensity_button_color},button_style, {width: 100}],
        onPress: () => this.set_intensity_type("medium"),
        underlayColor: 'white'
    }
    let touchProps_HardIntensity_Button = {
        style: [{borderColor: this.state.hard_intensity_border_color,
            backgroundColor: this.state.hard_intensity_button_color},button_style, {width: 100}],
        onPress: () => this.set_intensity_type("hard"),
        underlayColor: 'white'
    }
    return (
        
        <ImageBackground 
        source={require('../../../../FitnessAppBackgrounds/SwimBackground1.jpg')}
        resizeMode="cover"
        style = {styles.ImageBackground}
        >
            <ScrollView>

            <View style={styles.menuContainer}>

                    <View style={styles.adjustText}>
                          <Text style={[styles.MenuTitle]}>
                          Swim Workout Menu
                          </Text>
                      </View>

                    <View style={styles.TypeSwimContainer}>
                        <Text style={styles.typeText}>Choose a Type of Swim Workout</Text>
                        <View style={styles.TypeSwimButtons}>

                            <TouchableOpacity
                               {...touchProps_HrtRate180_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.hrt_rate_180_text_color}]}>Heart Rate 180</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                               {...touchProps_DistanceFree_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.distance_free_text_color}]}>Distance Freestyle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                {...touchProps_IM_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.IM_text_color}]}>IM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                {...touchProps_StrokeChoice_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.stroke_choice_text_color}]}>Stroke Choice</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                {...touchProps_Kick_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.kick_text_color}]}>Kick</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                {...touchProps_Pull_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.pull_text_color}]}>Pull</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                               {...touchProps_Vo2Max_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.vo2_max_text_color}]}>Vo2 Max</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                {...touchProps_Speed_50_100_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.speed_50_100_text_color}]}>Speed 50/100</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                {...touchProps_Speed_200_400_Button}
                            >
                            <Text style={[styles.buttonText, {color: this.state.speed_200_400_text_color}]}>Speed 200/400</Text>
                            </TouchableOpacity>
                            </View>
                            <Text style={[styles.ErrorMessage]}>{this.state.type_swim_workout_error_message}</Text>
                    </View>

                    <View style={styles.SwimIntensityButtonContainer}>

                        <Text style={styles.intensityText}>Choose a Swim Workout Intensity</Text>
                        <TouchableOpacity
                           {...touchProps_EasyIntensity_Button}
                        >
                        <Text style={[styles.buttonText, {color: this.state.easy_intensity_text_color}]}>Easy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            {...touchProps_MediumIntensity_Button}
                        >
                        <Text style={[styles.buttonText, {color: this.state.medium_intensity_text_color}]}>Medium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           {...touchProps_HardIntensity_Button}
                        >
                        <Text style={[styles.buttonText, {color: this.state.hard_intensity_text_color}]}>Hard</Text>
                        </TouchableOpacity>
                        <Text style={[styles.ErrorMessage]}>{this.state.swim_workout_intensity_error_message}</Text>

                    </View>

                    <View style={styles.DurationInputContainer}>

                        <Text style={styles.DurationText}>Enter a Workout Duration</Text>
                        <TextInput
                            placeholder='Duration (in minutes)'
                            style= {styles.DurationInput}
                            onChangeText={(workout_duration) => this.set_duration_input(workout_duration)}
                        />
                        <Text style={[styles.ErrorMessage]}>{this.state.swim_workout_duration_error_message}</Text>
                    </View>
                        <View style={styles.createWorkoutContainer}>

                            <TouchableOpacity 
                                    style={styles.createWorkoutButton}
                                    onPress={() => this.onGenerateWorkout()}>

                                        <Text style={styles.createWorkoutButtonText}> Create My Workout!</Text>

                            </TouchableOpacity> 

                        </View>
                </View>
           </ScrollView>
           </ImageBackground>
    )
  }
}

export default SwimWorkoutMenu

const styles = StyleSheet.create({
    adjustText: {
        flex: 1,
        backgroundColor: 'rgba(241, 255, 255, 0.8)',
        color: '#3A60C3',
        width: '90%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        padding: 10,
        marginTop: 40,
        borderRadius: 20,
      },
      ErrorMessage: {
        textAlign: 'center',
        color: 'red',
        padding: 20,
        fontFamily: 'YuseiMagic_400Regular',
        fontSize: 15,
      },
      MenuTitle:{
        marginTop: 30,
        fontFamily: 'MajorMonoDisplay_400Regular',
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30
      },
    menuContainer:{
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: 'rgba(241, 255, 255, 0.3)',
        width: '100%',
        borderColor: 'white',
        borderRadius: 20,
        shadowRadius: 20,
        borderWidth: 5,
        paddingBottom: 30,
        marginBottom: 50
    },
    ImageBackground:{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
      },
      TypeSwimContainer: {
          paddingTop: 20,
          marginTop: 20,
          marginBottom: 10,
          width: '95%',
          backgroundColor: 'white',
          borderRadius: 60,
          borderColor: 'black',
          borderRightWidth: 3,
          borderLeftWidth:3,
          borderBottomWidth: 14,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowOpacity: 0.8,
          elevation: 30,
          shadowRadius: 15 ,
          shadowOffset : { width: 1, height: 13},
        },
        TypeSwimButtons: {
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 30,
            marginRight: 40,
            marginLeft: 40,
        },
        typeText: {
            fontSize: 20,
            fontWeight: "900",
            textAlign: 'center',
            color: '#4B75E1',
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 20,
            marginTop: 20,
            fontFamily: 'YuseiMagic_400Regular',
        },
        intensityText: {
            fontSize: 20,
            fontWeight: "900",
            textAlign: 'center',
            color: '#4B75E1',
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 20,
            marginTop: 20,
            fontFamily: 'YuseiMagic_400Regular',
        },
        DurationText: {
            fontSize: 20,
            fontWeight: "900",
            textAlign: 'center',
            color: '#4B75E1',
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 20,
            marginTop: 20,
            fontFamily: 'YuseiMagic_400Regular',
        },
    DurationInputContainer: {
         paddingTop: 20,
          paddingBottom: 30,
          marginTop: 20,
          marginBottom: 10,
          width: '95%',
          backgroundColor: 'white',
          borderRadius: 60,
          borderColor: 'black',
          alignItems: 'center',
          borderRightWidth: 3,
          borderLeftWidth:3,
          borderBottomWidth: 14,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowOpacity: 0.8,
          elevation: 30,
          shadowRadius: 15 ,
          shadowOffset : { width: 1, height: 13},
      },
    DurationInput: {
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: '#3A60C3',
        alignContent: 'center',
        borderRadius: 20,
        width: 200,
        height: 60,
        textAlign: 'center',
        fontWeight: "800",
        marginBottom: 10
    },
    button: {
      backgroundColor: '#3A60C3',
      width: 150,
      marginTop: 5,
      marginLeft: 10,
      height: 40,
      borderRadius: 7,
      alignItems: 'center',
    },
    buttonText: {
      padding: 5,
      color: 'white',
      fontWeight: '700',
      fontSize: 15,
      fontFamily: 'YuseiMagic_400Regular',

    },
    SwimIntensityButtonContainer: {
        paddingTop: 20,
        paddingBottom: 30,
          marginTop: 20,
          marginBottom: 10,
          width: '95%',
          backgroundColor: 'white',
          borderRadius: 60,
          borderColor: 'black',
          alignItems: 'center',
          borderRightWidth: 3,
          borderLeftWidth:3,
          borderBottomWidth: 14,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowOpacity: 0.8,
          elevation: 30,
          shadowRadius: 15 ,
          shadowOffset : { width: 1, height: 13},
    },
    createWorkoutButton:{
        backgroundColor: '#D7E5F0',
        width: 250,
        alignItems: 'center',
        borderRadius: 30,
        height: 80,
        paddingTop: 15,
        borderBottomWidth: 10,
        borderBottomColor: 'black',
        marginTop: 20,
        paddingRight: 5,
        paddingLeft: 5,
        marginBottom: 50,
        borderRightWidth: 3,
        borderLeftWidth:3,
        borderBottomWidth: 14,
        elevation:50,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOpacity: 0.8,
        elevation: 30,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
      },
      createWorkoutButtonText:{
        color: '#3A60C3',
        fontSize: 20,
        fontWeight: "800",
        fontFamily: 'YuseiMagic_400Regular',
      },
  })

