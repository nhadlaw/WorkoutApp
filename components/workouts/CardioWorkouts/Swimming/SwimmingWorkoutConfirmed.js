import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
    FlatList,
    ScrollView,
    ImageBackground,
    TouchableOpacity
  } from 'react-native';
import Exercise from '../../../Exercise';
import ExerciseList from '../../../ExerciseList';
import * as Font from 'expo-font'

import {YuseiMagic_400Regular } from '@expo-google-fonts/yusei-magic';
import { MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';


//creating an object to match the type of swim workout that a user chooses
//to a specific kind of set


function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <Exercise text={`${props.value} `}/>;
}


export class SwimmingWorkoutConfirmed extends Component {

  componentDidMount(){
    const workout_duration = this.props.route.params.duration;
    const workout_intensity  = this.props.route.params.intensity;
    const type_swim_workout = this.props.route.params.type_swim_workout;
    const curr_user = this.props.route.params.current_user;

    //only for testing purposes
    this.loadFonts();

    this.setState({
      duration: workout_duration, intensity: workout_intensity, 
      type_swim_workout: type_swim_workout,
      current_user: curr_user,  workout_intensity: workout_intensity});
    

    const warm_up_set = this.props.route.params.warm_up_set;
    const warm_up_time = this.props.route.params.warm_up_time;
    const warm_up_repeats = this.props.route.params.warm_up_repeats;
    const ext_warm_up_set = this.props.route.params.ext_warm_up_set;
    const ext_warm_up_time = this.props.route.params.ext_warm_up_time;
    const ext_warm_up_repeats = this.props.route.params.ext_warm_up_repeats;
    const main_set_set = this.props.route.params.main_set_set;
    const main_set_time = this.props.route.params.main_set_time;
    const main_set_repeats = this.props.route.params.main_set_repeats;
    const cool_down_set = this.props.route.params.cool_down_set;
    const cool_down_time = this.props.route.params.cool_down_time;
    const cool_down_repeats = this.props.route.params.cool_down_repeats;



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

  completedWorkout () {
      this.props.navigation.navigate("Main")
  }

  SavedToCamerRoll () {
    this.props.navigation.navigate("Save To Camera Roll")
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
                          Heart Rate 180 Swim Workout
                          </Text>
                      </View>
            
              <View style ={styles.savingButtonContainer}>

                              <TouchableOpacity 
                              style={styles.saveOptionButton}
                              onPress={() => this.SavedToCamerRoll()}
                              >
                              
                                  <Text style={styles.saveOptionButtonText}> Save to Camera Roll</Text>

                              </TouchableOpacity>

                </View>
                  

                    <View style={styles.WarmUpContainer}>

                          <Text style={styles.set_title}> Warm up: {this.state.warm_up_time} min</Text>

                          <ExerciseList curr_name={"warm up"} set={this.state.warm_up_set} />
                          <Text style={styles.set_repeats}> Repeat {this.state.warm_up_repeats} x thru</Text>
                                       
                    </View>

                    <View style={styles.ExtWarmUpContainer}>

                      <Text style={styles.set_title}> Ext Warm up: {this.state.ext_warm_up_time} min</Text>

                      <ExerciseList curr_name={"ext warm up"} set={this.state.ext_warm_up_set}/>
                      <Text style={styles.set_repeats}> Repeat {this.state.ext_warm_up_repeats} x thru</Text>
                                       
                    </View>

                    <View style={styles.MainSetContainer}>

                      <Text style={styles.set_title}> Main Set: {this.state.main_set_time} min</Text>

                      <ExerciseList curr_name={"main set"} set={this.state.main_set_set}/>
                      <Text style={styles.set_repeats}> Repeat {this.state.main_set_repeats} x thru</Text>
                                    
                    </View>

                    <View style={styles.CoolDownContainer}>

                      <Text style={styles.set_title}> Cool Down: {this.state.cool_down_time} min</Text>

                      <ExerciseList curr_name={"cool down"} set={this.state.cool_down_set}/>
                    </View>

                    <View style={styles.completeWorkoutContainer}>

                      <TouchableOpacity 
                                style={styles.completeWorkoutButton}
                                onPress={() => this.completedWorkout()}>

                                    <Text style={styles.completeWorkoutText}> Complete workout</Text>

                        </TouchableOpacity> 

                    </View>


         </View>

       </ImageBackground>
      
       </ScrollView>

    ) 
  }
}



export default SwimmingWorkoutConfirmed

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  savingButtonContainer:{
    flex: 1,
    flexDirection: 'row',
  },
  saveOptionButton:{
    backgroundColor: '#D7E5F0',
    marginRight: 5, 
    marginLeft: 5,
    alignItems: 'center',
    borderRadius: 15,
    height: 60,
    paddingTop: 15,
    borderRightWidth: 1,
    borderLeftWidth:1,
    borderBottomWidth: 5,
    marginTop: 10,
  },
  saveOptionButtonText: {
    fontSize: 15,
    paddingRight: 10,
    paddingLeft: 10,
    fontWeight: "800",
    fontFamily: 'YuseiMagic_400Regular',
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
    marginTop: 10,
    marginBotton: 10,
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

  completeWorkoutButton:{
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
  completeWorkoutText:{
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




 