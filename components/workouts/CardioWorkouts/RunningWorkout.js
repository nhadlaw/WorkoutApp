import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
  } from 'react-native';
import {light_intensity, med_intensity} from '../../../workout_data/Cardio/RunningWorkouts'

export class RunningWorkout extends Component {
  render() {
    const run_intensity = this.props.route.params.intensity;
    const run_duration = this.props.route.params.duration;
    var run_workout = {};
    if (run_intensity == "light"){
      run_workout = light_intensity[0]
    }else{
      run_workout = med_intensity[0]
    }
    console.log("med workout", med_intensity)

    console.log("run workout", run_workout)
    return (
        <View>
        <Text>You chose a {run_intensity} intensity running workout for {run_duration} minutes</Text>
        <Text>Here's your workout:</Text>
        <Text>Warm up: {run_workout.warm_up}</Text>
        <Text>Workout: {run_workout.workout}</Text>
        <Text>Cool Down: {run_workout.cool_down}</Text>
        <Button
          onPress={() => this.props.navigation.navigate("Main")}
          title="Completed Workout!"
        />
    </View>
    )
  }
}

export default RunningWorkout