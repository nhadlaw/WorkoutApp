import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView
  } from 'react-native';
import Exercise from '../../../Exercise';
import ExerciseList from '../../../ExerciseList';

import * as Font from 'expo-font'

import {YuseiMagic_400Regular } from '@expo-google-fonts/yusei-magic';
import { MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';



import { create_warm_up, create_hrt_180_ext_warmup, create_hrt_180_set, create_cool_down } from '../../../../workout_data/Cardio/CreatingSwimmingWorkouts';

//creating an object to match the type of swim workout that a user chooses
//to a specific kind of set

const type_swim_workout_to_sets = {
  'hrt_rate_180': [create_hrt_180_ext_warmup, create_hrt_180_set]

}


export class SwimmingWorkout extends Component {

  componentDidMount(){
    const workout_duration = this.props.route.params.duration;
    const workout_intensity  = this.props.route.params.intensity;
    const type_swim_workout = this.props.route.params.type_swim_workout;
    //const curr_user = this.props.route.params.current_user;

    //only for testing purposes
    this.loadFonts();
    //const workout_duration = 18;
    //const workout_intensity  = 'hard';
    //const type_swim_workout = 'hrt_rate_180';
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

    

    const user_sets = type_swim_workout_to_sets[type_swim_workout];
    const ext_warm_up_fn = user_sets[0];
    const main_set_fn = user_sets[1];

    this.setState({
      duration: workout_duration, intensity: workout_intensity, 
      type_swim_workout: type_swim_workout,
      current_user: curr_user, user_sets: user_sets, workout_intensity: workout_intensity});
    

    const warm_up = create_warm_up(curr_user["steady_25_pace"], curr_user["steady_50_pace"], curr_user["steady_100_pace"], workout_duration, curr_user['swimmer_experience_level']);
    const warm_up_set = warm_up["set"];
    const warm_up_time = warm_up.total_time;
    const warm_up_repeats = warm_up.repeats;

    const ext_warm_up = ext_warm_up_fn(curr_user["steady_25_pace"], curr_user["steady_50_pace"], curr_user["steady_100_pace"], workout_duration);
    const ext_warm_up_set = ext_warm_up["set"];
    const ext_warm_up_time = ext_warm_up.total_time;
    const ext_warm_up_repeats = ext_warm_up.repeats;


    const main_set = main_set_fn(curr_user["steady_25_pace"], curr_user["steady_50_pace"], curr_user["steady_100_pace"], workout_duration, workout_intensity);
    const main_set_set = main_set["set"];
    const main_set_time = main_set.total_time;
    const main_set_repeats = main_set.repeats;

    const cool_down = create_cool_down(curr_user["steady_50_pace"], curr_user["steady_100_pace"], workout_duration, curr_user['swimmer_experience_level']);
    const cool_down_set = cool_down["set"];
    const cool_down_time = cool_down.total_time;
    const cool_down_repeats = cool_down.repeats;



    this.setState({
      warm_up_set: warm_up_set, 
      warm_up_time: warm_up_time,
      warm_up_repeats: warm_up_repeats,
      ext_warm_up_set: ext_warm_up_set, 
      ext_warm_up_time: ext_warm_up_time,
      ext_warm_up_repeats: ext_warm_up_repeats,
      main_set_set: main_set_set, 
      main_set_time: main_set_time,
      main_set_repeats: main_set_repeats,
      cool_down_set: cool_down_set, 
      cool_down_time: cool_down_time,
      cool_down_repeats: cool_down_repeats,

    });

    
    
  }

  constructor(props){
    super(props);

    //deciding what the user needs to enter in order to register
    this.state = {
        fontsLoaded: false,
        warm_up_set: '',
        warm_up_time: '',
        warm_up_repeats: '',
        ext_warm_up_set: '',
        ext_warm_up_time: '',
        ext_warm_up_repeats: '',
        duration: '',
        type_swim_workout: '',
        intensity: '',
        current_user: '',
        user_sets: '',
        main_set: '',
        cool_down: '',
        font_family: ''
    }
    //in order to access the state vars need to bind the onSignUP
    //function to the state variable
  }

  async loadFonts(){
    await Font.loadAsync({
      YuseiMagic_400Regular,
      MajorMonoDisplay_400Regular
    });
    this.setState({ fontsLoaded: true});
  }

  confirmedWorkout() {

    //want to navigate to a new page that just displays the final swim workout
    this.props.navigation.navigate('Swimming Workout Confirmed', {
      warm_up_set: this.state.warm_up_set, 
      warm_up_time: this.state.warm_up_time,
      warm_up_repeats: this.state.warm_up_repeats,
      ext_warm_up_set: this.state.ext_warm_up_set, 
      ext_warm_up_time: this.state.ext_warm_up_time,
      ext_warm_up_repeats: this.state.ext_warm_up_repeats,
      main_set_set: this.state.main_set_set, 
      main_set_time: this.state.main_set_time,
      main_set_repeats: this.state.main_set_repeats,
      cool_down_set: this.state.cool_down_set, 
      cool_down_time: this.state.cool_down_time,
      cool_down_repeats: this.state.cool_down_repeats,
      type_swim_workout: this.state.type_of_swim_workout, 
      duration: this.state.workout_duration, 
      intensity: this.state.workout_intensity,
      current_user: this.state.current_user
    })

  }

  updateWarmUp () {
    const curr_user = this.state.current_user;
    const warm_up = 
    create_warm_up(curr_user["steady_25_pace"], curr_user["steady_50_pace"], curr_user["steady_100_pace"], this.state.duration, curr_user['swimmer_experience_level']);
    const warm_up_set = warm_up["set"];
    const warm_up_time = warm_up.total_time;
    const warm_up_repeats = warm_up.repeats;

    this.setState({
      warm_up_set: warm_up_set, 
      warm_up_time: warm_up_time,
      warm_up_repeats: warm_up_repeats});
  }



  updateExtWarmUp () {
    const type_of_ext_warmup_fn = this.state.user_sets[0];
    const curr_user = this.state.current_user;
    
    const ext_warm_up = 
    type_of_ext_warmup_fn(curr_user["steady_25_pace"], curr_user["steady_50_pace"], curr_user["steady_100_pace"], this.state.duration);

    const ext_warm_up_set = ext_warm_up["set"];
    const ext_warm_up_time = ext_warm_up.total_time;
    const ext_warm_up_repeats = ext_warm_up.repeats;

    this.setState({
      ext_warm_up_set: ext_warm_up_set, 
      ext_warm_up_time: ext_warm_up_time,
      ext_warm_up_repeats: ext_warm_up_repeats});
    
  }


  updateMainSet () {
    const type_of_main_set_fn = this.state.user_sets[1];
    const curr_user = this.state.current_user;

    const main_set = 
    type_of_main_set_fn(curr_user["steady_25_pace"], curr_user["steady_50_pace"], curr_user["steady_100_pace"], this.state.duration, this.state.workout_intensity);
    
    const main_set_set = main_set["set"];
    const main_set_time = main_set.total_time;
    const main_set_repeats = main_set.repeats;

    this.setState({
      main_set_set: main_set_set, 
      main_set_time: main_set_time,
      main_set_repeats: main_set_repeats});
  }

  updateCoolDown () {
    const curr_user = this.state.current_user;

    const cool_down = create_cool_down( curr_user["steady_50_pace"], curr_user["steady_100_pace"], this.state.duration, curr_user['swimmer_experience_level']);
    
    const cool_down_set = cool_down["set"];
    const cool_down_time = cool_down.total_time;
    const cool_down_repeats = cool_down.repeats;

    this.setState({
      cool_down_set: cool_down_set, 
      cool_down_time: cool_down_time,
      cool_down_repeats: cool_down_repeats});
  }




  render() {

    return (
      
      <ScrollView>
       <ImageBackground 
       source={require('../../../../FitnessAppPics/SwimWorkoutBackground.png')}
       resizeMode="cover"
       style = {styles.ImageBackground}
       >
         <View style={styles.WorkoutContainer}>

                  <View style={styles.adjustText}>
                      <Text style={[styles.typeSwimWorkout]}>
                      Adjust Your Swim Workout 
                      </Text>
                      <Text style={[styles.adjustTextMessage]}>
                        Once your happy with it, scroll down and hit Confirm Workout!
                      </Text>
                  </View>
                  
                
                  

                    <View style={styles.WarmUpContainer}>

                          <Text style={styles.set_title}> Warm up: {this.state.warm_up_time} min</Text>

                          <ExerciseList curr_name={"warm up"} set={this.state.warm_up_set}/>
                          <Text style={styles.set_repeats}> Repeat {this.state.warm_up_repeats} x thru</Text>
                          <TouchableOpacity 
                                  style={styles.newSetButton}
                                  onPress={() => this.updateWarmUp()}>

                                      <Text style={styles.newSetButtonText}> New Warm up</Text>

                          </TouchableOpacity>                      
                    </View>

                    <View style={styles.ExtWarmUpContainer}>

                      <Text style={styles.set_title}> Ext Warm up: {this.state.ext_warm_up_time} min</Text>

                      <ExerciseList curr_name={"ext warm up"} set={this.state.ext_warm_up_set}/>
                      <Text style={styles.set_repeats}> Repeat {this.state.ext_warm_up_repeats} x thru</Text>
                      <TouchableOpacity 
                              style={styles.newSetButton}
                              onPress={() => this.updateExtWarmUp()}>

                                  <Text style={styles.newSetButtonText}> New Ext Warm up</Text>

                      </TouchableOpacity>                      
                    </View>

                    <View style={styles.MainSetContainer}>

                      <Text style={styles.set_title}> Main Set: {this.state.main_set_time} min</Text>

                      <ExerciseList curr_name={"main set"} set={this.state.main_set_set}/>
                      <Text style={styles.set_repeats}> Repeat {this.state.main_set_repeats} x thru</Text>
                      <TouchableOpacity 
                              style={styles.newSetButton}
                              onPress={() => this.updateMainSet()}>

                                  <Text style={styles.newSetButtonText}> New Main Set</Text>

                      </TouchableOpacity>                      
                    </View>

                    <View style={styles.CoolDownContainer}>

                      <Text style={styles.set_title}> Cool Down: {this.state.cool_down_time} min</Text>

                      <ExerciseList curr_name={"cool down"} set={this.state.cool_down_set}/>
                      <TouchableOpacity 
                              style={styles.newSetButton}
                              onPress={() => this.updateCoolDown()}>

                                  <Text style={styles.newSetButtonText}> New Cool Down</Text>

                      </TouchableOpacity>                      
                    </View>

                    <View style={styles.confirmWorkoutContainer}>

                      <TouchableOpacity 
                                style={styles.confirmWorkoutButton}
                                onPress={() => this.confirmedWorkout()}>

                                    <Text style={styles.confirmWorkoutText}> Confirm workout</Text>

                        </TouchableOpacity> 

                    </View>


         </View>

       </ImageBackground>
      
       </ScrollView>

    ) 
  }
}



export default SwimmingWorkout

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageBackground:{
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  updateWarmUp:{
    alignItems: 'center', 
    justifyContent: 'center'
  },
  setDescription:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  WorkoutContainer:{
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(241, 255, 255, 0.3)',
    width: '90%',
    borderColor: 'white',
    borderRadius: 20,
    shadowRadius: 20,
    borderWidth: 5,
    paddingBottom: 30
  },
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
  typeSwimWorkout:{
    marginTop: 30,
    fontFamily: 'MajorMonoDisplay_400Regular',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
  },
  adjustTextMessage:{
    fontSize: 15,
    marginBottom: 20,
    fontWeight: "900",
    textAlign: 'center'
  },
  WarmUpContainer: {
    marginTop: 50,
    marginBottom: 30,
    paddingBottom: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'contain',
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
  ExtWarmUpContainer: {
    marginTop: 50,
    marginBotton: 50,
    paddingBottom: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'contain',
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
  MainSetContainer: {
    marginTop: 50,
    marginBotton: 50,
    paddingBottom: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'contain',
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
  CoolDownContainer: {
    marginTop: 50,
    marginBotton: 50,
    paddingBottom: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'contain',
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
 
  set_title:{
    marginTop: 30,
    marginBottom: 39,
    color: '#3A60C3',
    fontFamily: 'YuseiMagic_400Regular',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "900",
  },
  set_repeats:{
    color: '#7482FD',
    marginBottom: 30,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: "900",
    fontFamily: 'YuseiMagic_400Regular',
  },

  newSetButton:{
    backgroundColor: '#3A60C3',
    width: 200,
    height: 40,
    borderRadius: 30,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    borderBottomWidth: 10,
    marginBottom: 20
  },
  newSetButtonText:{
    color: 'white',
    fontSize: 15,
    fontWeight: "800",
    textAlign: 'center',
    fontFamily: 'YuseiMagic_400Regular',
  },

  confirmWorkoutButton:{
    backgroundColor: '#D7E5F0',
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
  confirmWorkoutText:{
    color: '#3A60C3',
    fontSize: 25,
    fontWeight: "800",
    fontFamily: 'YuseiMagic_400Regular',
  },
  text:{
      //flex: 1,
      justifyContent:'center',
  }
});