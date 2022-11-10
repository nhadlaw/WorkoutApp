import React, { Component } from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground} from 'react-native';

import {YuseiMagic_400Regular } from '@expo-google-fonts/yusei-magic';
import { MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';
import * as Font from 'expo-font';
import ButtonList from '../../ButtonList';

import * as RunColors from '../../../../FitnessAppColors/RunningColors';
import {ext_menu_running_options, type_to_workout_length_text,
     all_run_types, type_to_ext_name, ext_menu_final_choice_to_units}
      from '../../../../workout_data/Cardio/Running/RunningMenuData'

export class RunWorkoutMenu extends Component {
    
    constructor(props) {
        super(props);

        //deciding what the user needs to enter in order to register
        this.state = {
            type_of_run_workout: 'null',
            workout_length: 'null',
            workout_intensity: 'null',
            enter_a_workout_text: 'Enter a Workout Duration',
            enter_a_workout_placeholder: 'Time (in minutes)',
            workout_length_units: 'minutes',
            current_user: 'null',
            extended_menu_title: '',
            extended_menu_title_font_size: 0,
            extended_menu_final_choice: 'null',
            first_ext_menu_choice: '',
            second_ext_menu_choice: '',
            third_ext_menu_choice: '',
            extended_menu_button_width: 0,
            extended_menu_button_height: 0,
            extended_menu_button_font_size: 0,
            extended_menu_error_message: '',
            extended_menu_error_message_font_size: 0,
            run_type_error_message: '',
            run_type_error_message_font_size: 0,
            run_intensity_error_message: '',
            run_intensity_error_message_font_size: 0,
            run_length_error_message: '',
            run_length_error_message_font_size: 0,
            time_interval_run_button_color: RunColors.unclicked_button_color,
            time_interval_run_border_color: RunColors.unclicked_button_color,
            time_interval_run_text_color: RunColors.unclicked_button_text_color,
            distance_interval_run_button_color: RunColors.unclicked_button_color,
            distance_interval_run_border_color: RunColors.unclicked_button_color,
            distance_interval_run_text_color: RunColors.unclicked_button_text_color,
            track_workout_button_color: RunColors.unclicked_button_color,
            track_workout_border_color: RunColors.unclicked_button_color,
            track_workout_text_color: RunColors.unclicked_button_text_color,
            fartlek_button_color: RunColors.unclicked_button_color,
            fartlek_border_color: RunColors.unclicked_button_color,
            fartlek_text_color: RunColors.unclicked_button_text_color,
            long_run_button_color: RunColors.unclicked_button_color,
            long_run_border_color: RunColors.unclicked_button_color,
            long_run_text_color: RunColors.unclicked_button_text_color,
            fontsLoaded: false,
            easy_intensity_button_color: RunColors.unclicked_button_color,
            easy_intensity_border_color: RunColors.unclicked_button_color,
            easy_intensity_text_color: RunColors.unclicked_button_text_color,
            medium_intensity_button_color: RunColors.unclicked_button_color,
            medium_intensity_border_color: RunColors.unclicked_button_color,
            medium_intensity_text_color: RunColors.unclicked_button_text_color,
            hard_intensity_button_color: RunColors.unclicked_button_color,
            hard_intensity_border_color: RunColors.unclicked_button_color,
            hard_intensity_text_color: RunColors.unclicked_button_text_color,
            first_ext_menu_button_color: "white",
            first_ext_menu_border_color: "white",
            first_ext_menu_text_color: RunColors.unclicked_button_text_color,
            second_ext_menu_button_color: "white",
            second_ext_menu_border_color: "white",
            second_ext_menu_text_color: RunColors.unclicked_button_text_color,
            third_ext_menu_button_color: "white",
            third_ext_menu_border_color: "white",
            third_ext_menu_text_color: RunColors.unclicked_button_text_color,
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
        let curr_workout_length = this.state.workout_length;
        let curr_workout_length_units = this.state.workout_length_units;
        let valid_workout_length = true;
        let valid_type = true;
        let valid_ext_menu_choice = true;
        let valid_intensity = true;
        let float_value = parseFloat(curr_workout_length);
        let time_error_message = 'Please enter a valid time in minutes';
        
        if (curr_workout_length_units == 'miles') {
            'Please enter a valid distance in miles'
        }

        console.log('curr workout length', curr_workout_length)
        if (isNaN(curr_workout_length) || curr_workout_length == "null" || curr_workout_length == ''){
            //not a proper integer
            //find a way to reload the page and give the error message
            valid_workout_length = false;
            this.setState({
                run_length_error_message: time_error_message,
                run_length_error_message_font_size: 15
            });
        }
       
        if (this.state.type_of_run_workout == "null") {
            valid_type = false;
            this.setState({
                run_type_error_message: 'Please Choose a Run Workout Type',
                run_type_error_message_font_size: 15
            });
            
        } else {
            if (this.state.extended_menu_final_choice == "null") {
                let curr_run_type = type_to_ext_name[this.state.type_of_run_workout]
                valid_workout_length = false;
                this.setState({
                    extended_menu_error_message: `Please Choose a Type of ${curr_run_type} Workout`,
                    extended_menu_error_message_font_size: 15
                });
                valid_ext_menu_choice = false;
            }
           
        }


        if (this.state.workout_intensity == "null") {
            valid_intensity = false;
            this.setState({
                run_intensity_error_message: 'Please Choose a Run Intensity',
                run_intensity_error_message_font_size: 15
            });
        }
        if (valid_workout_length && valid_type && valid_intensity && valid_ext_menu_choice) {

            let ext_menu_choice = this.state.extended_menu_final_choice;
            
            this.props.navigation.navigate("Running Workout",
            {
                type_of_run_workout: this.state.type_of_run_workout, 
                length: this.state.workout_length, 
                length_units: ext_menu_final_choice_to_units[ext_menu_choice],
                ext_menu_choice: this.state.extended_menu_final_choice,
                intensity: this.state.workout_intensity,
                current_user: this.state.current_user
            });
        }
        
    }


    arrayRemove(arr, value) {
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    set_ext_menu_choice(type) {

        //so type is either first_ext_menu, second_ext_menu, or third_ext_menu
        const all_ext_types = ["first_ext_menu", "second_ext_menu", "third_ext_menu"];
        const curr_ext_menu_button_color = `${type}_button_color`;
        const curr_ext_menu_border_color = `${type}_border_color`;
        const curr_ext_menu_text_color = `${type}_text_color`;
      
        this.setState({
            extended_menu_final_choice: 'null',
            extended_menu_error_message: "",
            extended_menu_error_message_font_size: 0
        });
        
        if (this.state[curr_ext_menu_button_color] == RunColors.clicked_button_color) {    
            this.setState({extended_menu_final_choice: "null"});       
            this.state[curr_ext_menu_button_color] = RunColors.unclicked_button_color
            this.state[curr_ext_menu_border_color] = RunColors.unclicked_button_color
            this.state[curr_ext_menu_text_color] = RunColors.unclicked_button_text_color
        } else {
            const curr_ext_menu_option = `${type}_choice`;
            const curr_ext_menu_choice = this.state[curr_ext_menu_option];
            
            //setting the third option of the menu based on the users choice of the item
            console.log(type_to_workout_length_text, curr_ext_menu_choice)
            this.setState({
                enter_a_workout_text: (type_to_workout_length_text[curr_ext_menu_choice])['title'],
                enter_a_workout_placeholder: (type_to_workout_length_text[curr_ext_menu_choice])['placeholder']
            })
            
            this.setState({extended_menu_final_choice: curr_ext_menu_choice});
            this.state[curr_ext_menu_button_color] = RunColors.clicked_button_color;
            this.state[curr_ext_menu_border_color] = RunColors.clicked_button_border_color;
            this.state[curr_ext_menu_text_color] = RunColors.clicked_button_text_color;
            let other_types = this.arrayRemove(all_ext_types, type);

            for (let i = 0; i < other_types.length; i++) {
                let new_type = other_types[i];
                let other_ext_menu_button_color = `${new_type}_button_color`;
                let other_ext_menu_border_color = `${new_type}_border_color`;
                let other_ext_menu_text_color = `${new_type}_text_color`;

                this.state[other_ext_menu_button_color] = RunColors.unclicked_button_color;
                this.state[other_ext_menu_border_color] = RunColors.unclicked_button_color;
                this.state[other_ext_menu_text_color] = RunColors.unclicked_button_text_color;
            }

        }   

    }

    set_intensity_type(type) {
        this.setState({
            run_intensity_error_message: "",
            run_intensity_error_message_font_size: 0
        });
        if (type == "medium") {
            if (this.state.medium_intensity_button_color == RunColors.clicked_button_color) {
                this.setState({workout_intensity: "null"});
                this.setState({medium_intensity_button_color: RunColors.unclicked_button_color,
                    medium_intensity_border_color: RunColors.unclicked_button_color,
                    medium_intensity_text_color: RunColors.unclicked_button_text_color});
            }else {
                this.setState({swim_workout_intensity_error_message: ""});
                this.setState({workout_intensity: type});
                this.setState({medium_intensity_button_color: RunColors.clicked_button_color,
                               medium_intensity_border_color: RunColors.clicked_button_border_color,
                               medium_intensity_text_color: RunColors.clicked_button_text_color});
                this.setState({hard_intensity_button_color: RunColors.unclicked_button_color,
                               hard_intensity_border_color: RunColors.unclicked_button_color,
                               hard_intensity_text_color: RunColors.unclicked_button_text_color});
                this.setState({easy_intensity_button_color: RunColors.unclicked_button_color,
                               easy_intensity_border_color: RunColors.unclicked_button_color,
                               easy_intensity_text_color: RunColors.unclicked_button_text_color});
            }
        }
        if (type == "easy") {
            if (this.state.easy_intensity_button_color == RunColors.clicked_button_color) {
                this.setState({workout_intensity: ''});
                this.setState({easy_intensity_button_color: RunColors.unclicked_button_color,
                    easy_intensity_border_color: RunColors.unclicked_button_color,
                    easy_intensity_text_color: RunColors.unclicked_button_text_color});
            }else {
                this.setState({swim_workout_intensity_error_message: ""});
                this.setState({workout_intensity: type});
                this.setState({easy_intensity_button_color: RunColors.clicked_button_color,
                               easy_intensity_border_color: RunColors.clicked_button_border_color,
                               easy_intensity_text_color: RunColors.clicked_button_text_color});
                this.setState({medium_intensity_button_color: RunColors.unclicked_button_color,
                               medium_intensity_border_color: RunColors.unclicked_button_color,
                               medium_intensity_text_color: RunColors.unclicked_button_text_color});
                this.setState({hard_intensity_button_color: RunColors.unclicked_button_color,
                               hard_intensity_border_color: RunColors.unclicked_button_color,
                               hard_intensity_text_color: RunColors.unclicked_button_text_color});
            }
        } 
        if (type == "hard") {
            if (this.state.hard_intensity_button_color == RunColors.clicked_button_color) {
                this.setState({workout_intensity: ''});
                this.setState({hard_intensity_button_color: RunColors.unclicked_button_color,
                    hard_intensity_border_color: RunColors.unclicked_button_color,
                    hard_intensity_text_color: RunColors.unclicked_button_text_color});
            }else {
                this.setState({swim_workout_intensity_error_message: ""});
                this.setState({workout_intensity: type});
                this.setState({hard_intensity_button_color: RunColors.clicked_button_color,
                               hard_intensity_border_color: RunColors.clicked_button_border_color,
                               hard_intensity_text_color: RunColors.clicked_button_text_color});
                this.setState({medium_intensity_button_color: RunColors.unclicked_button_color,
                               medium_intensity_border_color: RunColors.unclicked_button_color,
                               medium_intensity_text_color: RunColors.unclicked_button_text_color});
                this.setState({easy_intensity_button_color: RunColors.unclicked_button_color,
                               easy_intensity_border_color: RunColors.unclicked_button_color,
                               easy_intensity_text_color: RunColors.unclicked_button_text_color});
            }
        } 
    }

    set_extended_menu(type){
        this.setState({
            extended_menu_final_choice: 'null',
            extended_menu_error_message: "",
            extended_menu_error_message_font_size: 0
        });
        if (type == "null"){
            this.setState({extended_menu_button_height: 0, extended_menu_button_width: 0});
            this.setState({extended_menu_button_font_size: 0});
            this.setState({extended_menu_title: '',
                           extended_menu_title_font_size: 0});
           
            this.setState({
                first_ext_menu_button_color: "white",
                first_ext_menu_border_color: "white",
                first_ext_menu_text_color: RunColors.unclicked_button_text_color,
                second_ext_menu_button_color: "white",
                second_ext_menu_border_color: "white",
                second_ext_menu_text_color: RunColors.unclicked_button_text_color,
                third_ext_menu_button_color: "white",
                third_ext_menu_border_color: "white",
                third_ext_menu_text_color: RunColors.unclicked_button_text_color,
                first_ext_menu_choice: "null",
                second_ext_menu_choice: "null",
                first_ext_menu_choice: "null"
            });
            return false;
        }
        this.setState({extended_menu_button_height: "auto", extended_menu_button_width: '30%'});
        this.setState({extended_menu_button_font_size: 10,
                        extended_menu_title_font_size: 20});

        let three_choices =( ext_menu_running_options[type])['choices'];
        let ext_menu_title = ( ext_menu_running_options[type])['title'];
        
        this.setState({first_ext_menu_choice: three_choices[0]});
        this.setState({
            first_ext_menu_button_color: RunColors.unclicked_button_color,
            first_ext_menu_border_color: RunColors.unclicked_button_color,
            first_ext_menu_text_color: RunColors.unclicked_button_text_color,
            second_ext_menu_button_color: RunColors.unclicked_button_color,
            second_ext_menu_border_color: RunColors.unclicked_button_color,
            second_ext_menu_text_color: RunColors.unclicked_button_text_color,
            third_ext_menu_button_color: RunColors.unclicked_button_color,
            third_ext_menu_border_color: RunColors.unclicked_button_color,
            third_ext_menu_text_color: RunColors.unclicked_button_text_color,
        });
        this.setState({second_ext_menu_choice: three_choices[1]});
        this.setState({third_ext_menu_choice: three_choices[2]});
        this.setState({extended_menu_title: ext_menu_title})
    }


    set_run_type(type) {
    
        const curr_run_type_button_color = `${type}_button_color`;
        const curr_run_type_border_color = `${type}_border_color`;
        const curr_run_type_text_color = `${type}_text_color`;
      
        if (this.state[curr_run_type_button_color] == RunColors.clicked_button_color) {           
            this.setState({type_of_run_workout: "null"});
            this.set_extended_menu("null");
            this.state[curr_run_type_button_color] = RunColors.unclicked_button_color
            this.state[curr_run_type_border_color] = RunColors.unclicked_button_color
            this.state[curr_run_type_text_color] = RunColors.unclicked_button_text_color
        } else {
            this.setState({type_of_run_workout: type});
            this.setState({
                extended_menu_final_choice: 'null',
                extended_menu_error_message: "",
                extended_menu_error_message_font_size: 0
            });
            this.setState({
                run_type_error_message: "",
                run_type_error_message_font_size: 0
            });

            this.state[curr_run_type_button_color] = RunColors.clicked_button_color;
            this.state[curr_run_type_border_color] = RunColors.clicked_button_border_color;
            this.state[curr_run_type_text_color] = RunColors.clicked_button_text_color;
            let other_types = this.arrayRemove(all_run_types, type);

            for (let i = 0; i < other_types.length; i++) {
                let new_type = other_types[i];
                let other_run_type_button_color = `${new_type}_button_color`;
                let other_run_type_border_color = `${new_type}_border_color`;
                let other_run_type_text_color = `${new_type}_text_color`;

                this.state[other_run_type_button_color] = RunColors.unclicked_button_color;
                this.state[other_run_type_border_color] = RunColors.unclicked_button_color;
                this.state[other_run_type_text_color] = RunColors.unclicked_button_text_color;
              
            }
            this.set_extended_menu(type);
        }     
    }

    set_duration_input(length) {
        console.log('workout length', length);
        this.setState({ workout_length: length });
        this.setState({ 
            run_length_error_message: "",
            run_length_error_message_font_size: 15
        });

        if (this.state.enter_a_workout_text == "Time ( in minutes )") {
            this.setState({
                workout_length_units: 'minutes'
            })
        } else {
            this.setState({
                workout_length_units: 'miles'
            })
        }
    }


  render() {
    let button_style = {
        width: 150,
        marginTop: 5,
        borderRadius: 7,
        borderWidth: 5,
        marginLeft: 5,
        marginRight: 5
    }

    //RUN TYPE BUTTON TOUCH PROPS
    let touchProps_TimeIntervalRun_Button = {
        style: [{borderColor: this.state.time_interval_run_border_color,
            backgroundColor: this.state.time_interval_run_button_color}, button_style],
        onPress: () => this.set_run_type('time_interval_run'),
        underlayColor: 'white'
    }
    let touchProps_DistanceIntervalRun_Button = {
        style: [{borderColor: this.state.distance_interval_run_border_color,
            backgroundColor: this.state.distance_interval_run_button_color}, button_style],
        onPress: () => this.set_run_type('distance_interval_run'),
        underlayColor: 'white'
    }
    let touchProps_TrackWorkout_Button = {
        style: [{borderColor: this.state.track_workout_border_color,
            backgroundColor: this.state.track_workout_button_color}, button_style],
        onPress: () => this.set_run_type('track_workout'),
        underlayColor: 'white'
    }
    let touchProps_Fartlek_Button = {
        style: [{borderColor: this.state.fartlek_border_color,
            backgroundColor: this.state.fartlek_button_color}, button_style],
        onPress: () => this.set_run_type('fartlek'),
        underlayColor: 'white'
    }
    let touchProps_LongRun_Button = {
        style: [{borderColor: this.state.long_run_border_color,
            backgroundColor: this.state.long_run_button_color}, button_style],
        onPress: () => this.set_run_type('long_run'),
        underlayColor: 'white'
    }

    //EXT MENU TOUCH PROPS

    let touchProps_FirstExtMenu_Button = {
        style: [{borderColor: this.state.first_ext_menu_border_color,
            backgroundColor: this.state.first_ext_menu_button_color},button_style, 
            {width: this.state.extended_menu_button_width, height: this.state.extended_menu_button_height}],
        onPress: () => this.set_ext_menu_choice("first_ext_menu"),
        underlayColor: 'white'
    }
    let touchProps_SecondExtMenu_Button = {
        style: [{borderColor: this.state.second_ext_menu_border_color,
            backgroundColor: this.state.second_ext_menu_button_color},button_style,
             {width: this.state.extended_menu_button_width, height: this.state.extended_menu_button_height}],
        onPress: () => this.set_ext_menu_choice("second_ext_menu"),
        underlayColor: 'white'
    }
    let touchProps_ThirdExtMenu_Button = {
        style: [{borderColor: this.state.third_ext_menu_border_color,
            backgroundColor: this.state.third_ext_menu_button_color},button_style,
             {width: this.state.extended_menu_button_width, height: this.state.extended_menu_button_height}],
        onPress: () => this.set_ext_menu_choice("third_ext_menu"),
        underlayColor: 'white'
    }
    
    //INTENSITY BUTTON TOUCH PROPS
    
    let touchProps_EasyIntensity_Button = {
        style: [{borderColor: this.state.easy_intensity_border_color,
            backgroundColor: this.state.easy_intensity_button_color},button_style, {width: '60%'}],
        onPress: () => this.set_intensity_type("easy"),
        underlayColor: 'white'
    }
    let touchProps_MediumIntensity_Button = {
        style: [{borderColor: this.state.medium_intensity_border_color,
            backgroundColor: this.state.medium_intensity_button_color},button_style, {width: '60%'}],
        onPress: () => this.set_intensity_type("medium"),
        underlayColor: 'white'
    }
    let touchProps_HardIntensity_Button = {
        style: [{borderColor: this.state.hard_intensity_border_color,
            backgroundColor: this.state.hard_intensity_button_color},button_style, {width: '60%'}],
        onPress: () => this.set_intensity_type("hard"),
        underlayColor: 'white'
    }

    
    return (
        <ScrollView>

        <ImageBackground 
        source={require('../../../../FitnessAppBackgrounds/RunWorkoutBackground.jpg')}
        resizeMode="cover"
        style = {styles.ImageBackground}
        >

            <View style={styles.menuContainer}>

                    <View style={styles.adjustText}>
                          <Text style={[styles.MenuTitle]}>
                          Run Workout Menu
                          </Text>
                      </View>

                    <View style={styles.TypeRunContainer}>
                                <Text style={styles.typeText}>Choose a Type of Run Workout</Text>
                                <View style={styles.TypeRunButtons}>

                                    <TouchableOpacity
                                    {...touchProps_TimeIntervalRun_Button}
                                    >
                                    <Text style={[styles.buttonText, {color: this.state.time_interval_run_text_color}]}>Time Interval Run</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    {...touchProps_DistanceIntervalRun_Button}
                                    >
                                    <Text style={[styles.buttonText, {color: this.state.distance_interval_run_text_color}]}>Distance Interval Run</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    {...touchProps_TrackWorkout_Button}
                                    >
                                    <Text style={[styles.buttonText, {color: this.state.track_workout_text_color}]}> Track Workout</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity
                                    {...touchProps_Fartlek_Button}
                                    >
                                    <Text style={[styles.buttonText, {color: this.state.fartlek_text_color}]}>Fartlek Run</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        {...touchProps_LongRun_Button}
                                    >
                                    <Text style={[styles.buttonText, {color: this.state.long_run_text_color}]}>Long Run</Text>
                                    </TouchableOpacity>

                                </View>
                                <Text style={[styles.ErrorMessage, {fontSize: this.state.run_type_error_message_font_size}]}>{this.state.run_type_error_message}</Text>
                                <View style={styles.extendedTypeMenuContainer}>
                                        <Text style={[styles.extendedTypeMenuText, {fontSize: this.state.extended_menu_title_font_size}]}> {this.state.extended_menu_title} </Text>
                                        <View style={styles.extendedTypeMenuButtons}>
                                            <TouchableOpacity
                                                {...touchProps_FirstExtMenu_Button}
                                            >
                                            <Text style={[styles.extendedMenuButtonText, {fontSize: this.state.extended_menu_button_font_size, color: this.state.first_ext_menu_text_color}]}>{this.state.first_ext_menu_choice}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                {...touchProps_SecondExtMenu_Button}
                                            >
                                            <Text style={[styles.extendedMenuButtonText, {fontSize: this.state.extended_menu_button_font_size, color: this.state.second_ext_menu_text_color}]}>{this.state.second_ext_menu_choice}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                {...touchProps_ThirdExtMenu_Button}

                                            >
                                            <Text style={[styles.extendedMenuButtonText, {fontSize: this.state.extended_menu_button_font_size, color: this.state.third_ext_menu_text_color}]}>{this.state.third_ext_menu_choice}</Text>

                                            </TouchableOpacity>

                                        </View>
                                        <Text style={[styles.ErrorMessage, {fontSize: this.state.extended_menu_error_message_font_size}]}>{this.state.extended_menu_error_message}</Text>

                                </View>
                    </View>

                   

                    <View style={styles.RunIntensityButtonContainer}>

                        <Text style={styles.intensityText}>Choose a Run Workout Intensity</Text>
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
                        <Text style={[styles.ErrorMessage, {fontSize: this.state.run_intensity_error_message_font_size}]}>{this.state.run_intensity_error_message}</Text>

                    </View>

                    <View style={styles.DurationInputContainer}>

                        <Text style={styles.DurationText}>{this.state.enter_a_workout_text}</Text>
                        <TextInput
                            placeholder={this.state.enter_a_workout_placeholder}
                            style= {styles.DurationInput}
                            onChangeText={(workout_length) => this.set_duration_input(workout_length)}
                        />
                        <Text style={[styles.ErrorMessage, {fontSize: this.state.run_length_error_message_font_size}]}>{this.state.run_length_error_message}</Text>

                    </View>
                        <View style={styles.createWorkoutContainer}>

                            <TouchableOpacity 
                                    style={styles.createWorkoutButton}
                                    onPress={() => this.onGenerateWorkout()}>

                                        <Text style={styles.createWorkoutButtonText}> Create My Workout</Text>

                            </TouchableOpacity> 

                        </View>
                </View>
           </ImageBackground>
        </ScrollView>
    )
  }
}

export default RunWorkoutMenu

const styles = StyleSheet.create({
    adjustText: {
        flex: 1,
        backgroundColor: 'rgba(211, 255, 210, 0.9)',
        width: '90%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        padding: 10,
        marginTop: 40,
        borderRadius: 20,
      },
    
      extendedTypeMenuButtons:{
        flexDirection: 'row',
        marginBottom: 15,
        marginRight: 15
      },
      extendedTypeMenuText: {
        textAlign: 'center',
        fontWeight: "900",
        textAlign: 'center',
        color: '#47A16B',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'YuseiMagic_400Regular',
      },
      extendedTypeMenuContainer: {
        alignItems: 'center',
        marginLeft: 20
      },
      ErrorMessage: {
        textAlign: 'center',
        color: 'red',
        padding: 20,
        fontFamily: 'YuseiMagic_400Regular',
        fontSize: 15,
      },
      extendedMenuButton: {
        backgroundColor: '#47A16B',
        marginTop: 5,
        marginLeft: 10,
        borderRadius: 7,
        alignItems: 'center',
      },
      extendedMenuButtonText: {
        padding: 10,
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'YuseiMagic_400Regular',
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
        width: '90%',
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
      TypeRunContainer: {
          paddingTop: 20,
          marginTop: 20,
          marginBottom: 10,
          width: '95%',
          alignItems: 'center',
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
        TypeRunButtons: {
            alignContent: 'center',
            marginTop: 10,
            marginRight: 40,
            marginLeft: 40,
        },
        typeText: {
            fontSize: 20,
            fontWeight: "900",
            textAlign: 'center',
            color: '#47A16B',
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
            color: '#47A16B',
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
            color: '#47A16B',
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
        borderColor: '#47A16B',
        alignContent: 'center',
        borderRadius: 20,
        width: 200,
        height: 60,
        textAlign: 'center',
        fontWeight: "800",
        marginBottom: 10
    },
    TypeRunButton: {
      backgroundColor: '#47A16B',
      width: 150,
      marginTop: 5,
      borderRadius: 7,
      alignItems: 'center',
    },
    button: {
        backgroundColor: '#47A16B',
        width: 150,
        marginTop: 5,
        marginLeft: 10,
        height: 40,
        borderRadius: 7,
        alignItems: 'center',
      },
    buttonText: {
      padding: 10,
      color: 'white',
      fontWeight: '700',
      textAlign: 'center',
      fontSize: 15,
      fontFamily: 'YuseiMagic_400Regular',

    },
    RunIntensityButtonContainer: {
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
        backgroundColor: '#A7EBC2',
        width: 250,
        alignItems: 'center',
        borderRadius: 30,
        height: 80,
        paddingTop: 15,
        borderBottomWidth: 10,
        borderBottomColor: 'black',
        marginTop: 20,
        marginBottom: 20,
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
        color: '#47A16B',
        fontSize: 25,
        fontWeight: "800",
        fontFamily: 'YuseiMagic_400Regular',
      },
  })

