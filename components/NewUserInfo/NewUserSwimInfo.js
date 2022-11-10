import React, { Component } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
  } from 'react-native';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const all_swimmer_user_info = ["steady_25_pace",
"steady_50_pace",
"steady_100_pace",
"swimmer_experience_level",
"fly_pace",
"backstroke_pace",
"breaststroke_pace",
"IM_pace",
"max_comfy_dist"];

export class NewUserSwimInfo extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  constructor(props){
    super(props);

    //deciding what the user needs to enter in order to register
    this.state = {
        steady_25_pace: '',
        steady_50_pace: '',
        steady_100_pace: '',
        swimmer_experience_level: '',
        fly_pace: '',
        backstroke_pace: '',
        breaststroke_pace: '',
        IM_pace: '',
        max_comfy_dist: ''
    }

    //in order to access the state vars need to bind the onSignUPs
    //function to the state variable
  }

  writeUserData(user) {
    firebase.firestore().collection("users")
                .doc(user.uid)
                .set(user)
  }

  onEnterSwimmerInfo(){
    const curr_user = this.props.currentUser;
    if (curr_user != undefined && curr_user != null){

      if (this.state.steady_25_pace != ''){
        curr_user["steady_25_pace"] = this.state.steady_25_pace;
      }

      if (this.state.steady_50_pace != ''){
        curr_user["steady_50_pace"] = this.state.steady_50_pace;
      }

      if (this.state.steady_100_pace != ''){
        curr_user["steady_100_pace"] = this.state.steady_100_pace;
      }

      if (this.state.swimmer_experience_level != ''){
        curr_user["swimmer_experience_level"] = this.state.swimmer_experience_level;
      }

      if (this.state.fly_pace != ''){
        curr_user["fly_pace"] = this.state.fly_pace;
      }

      if (this.state.backstroke_pace != ''){
        curr_user["backstroke_pace"] = this.state.backstroke_pace;
      }

      if (this.state.breaststroke_pace != ''){
        curr_user["breaststroke_pace"] = this.state.breaststroke_pace;
      }

      if (this.state.IM_pace != ''){
        curr_user["IM_pace"] = this.state.IM_pace;
      }

      if (this.state.max_comfy_dist != ''){
        curr_user["max_comfy_dist"] = this.state.max_comfy_dist;
      }

      this.writeUserData(curr_user);


    }

    this.props.navigation.navigate("Swim Workout Menu", {current_user: curr_user});
  }



  render() {
    const curr_user = this.props.route.params.current_user;
    return (
      <ScrollView >
        <View style={styles.container}>
              <Text style={styles.introTextOne}>Hey {curr_user.name}!!</Text>
              <Text style = {styles.introTextTwo}>Since this is your first swim workout, let's get to know a little more about you as a swimmer!
              </Text>
              <Text style={styles.questionText}>Please enter your approximate and steady paces for freestyle</Text>
              <View style = {styles.InputContainer}>
                  <TextInput
                    placeholder='25 Pace (in minutes)'
                    style={styles.input}
                    onChangeText={(steady_25_pace) => this.setState({ steady_25_pace })}
                  />
                  <TextInput
                    placeholder='50 Pace (in minutes) '
                    style={styles.input}
                    onChangeText={(steady_50_pace) => this.setState({ steady_50_pace })}
                  />
                  <TextInput
                    placeholder='100 pace (in minutes)'
                    style={styles.input}
                    onChangeText={(steady_100_pace) => this.setState({ steady_100_pace })}
                  />
              </View>
              <Text style={styles.questionText}>Please enter your approximate and steady stroke paces</Text>
              <View style = {styles.InputContainer}>
                  <TextInput
                    placeholder='50 butterfly Pace (in minutes)'
                    style={styles.input}
                    onChangeText={(fly_pace) => this.setState({ fly_pace })}
                  />
                  <TextInput
                    placeholder='50 backstroke (in minutes) '
                    style={styles.input}
                    onChangeText={(backstroke_pace) => this.setState({ backstroke_pace })}
                  />
                  <TextInput
                    placeholder='50 breaststroke (in minutes)'
                    style={styles.input}
                    onChangeText={(breaststroke_pace) => this.setState({ breaststroke_pace })}
                  />
              </View>
              <Text style={styles.questionText}>Please enter your approximate IM pace</Text>
              <View style = {styles.InputContainer}>
                  <TextInput
                    placeholder='100 IM (indiidual medley) Pace (in minutes)'
                    style={styles.input}
                    onChangeText={(IM_pace) => this.setState({ IM_pace })}
                  />
              </View>
              <Text style={styles.questionText}>Is there a max distance you can swim at a time, if so what is it?</Text>
              <View style = {styles.InputContainer}>
                  <TextInput
                    placeholder='Maximum Comfortable Distance to swim non-stop (optional)'
                    style={styles.input}
                    onChangeText={(max_comfy_dist) => this.setState({ max_comfy_dist })}
                  />
              </View>
              <Text style={styles.questionText}>What is your current skill level as a swimmer?</Text>
              <View style = {styles.LevelContainer}>
                  <TouchableOpacity
                      onPress = {() => this.setState({swimmer_experience_level: 'beginner'})}
                      style={styles.LevelButton}
                  >
                    <Text style={styles.buttonText}>Beginner</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress = {() => this.setState({swimmer_experience_level: 'intermediate'})}
                      style={styles.LevelButton}
                  >
                    <Text style={styles.buttonText}>Intermediate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress = {() => this.setState({swimmer_experience_level: 'advanced'})}
                      style={styles.LevelButton}
                  >
                    <Text style={styles.buttonText}>Advanced</Text>
                  </TouchableOpacity>
              </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                      onPress = {() => this.onEnterSwimmerInfo()}
                      style={styles.button}
                  >
                    <Text style={styles.buttonText}>Enter My Info</Text>
                  </TouchableOpacity>
                  </View>
        </View>
        </ScrollView>

    )
  }
}


//This allows us to access fetchUser in components
export default connect(mapStateToProps, mapDispatchProps) (NewUserSwimInfo)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  InputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5
  },
  introTextOne:{
    alignItems:'center',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
    fontSize: 50,
    display: 'flex',
    width: '80%',
  },
  introTextTwo:{
    alignItems:'center',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
    display: 'flex',
    width: '80%',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#ADD8E6',
    width: 200,
    height: 40,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30
  },
  LevelButton: {
    marginTop: 20,
    backgroundColor: '#E31C79',
    width: 100,
    height: 40,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 30
  },
  LevelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'black',
    fontWeight: "700",
    fontSize: 15,
  },
  questionText:{
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    padding: 20
  }
})