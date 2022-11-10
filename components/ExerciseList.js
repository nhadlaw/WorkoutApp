import React from 'react';
import Exercise from './Exercise';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Button,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    TouchableHighlight
  } from 'react-native';

export default function ExerciseList(props) {

    const [isClickedStyle, setIsClickedStyle] = React.useState("none");
    const [CheckMarkButton, setCheckMarkButton] = React.useState("\u2610")


   const adjustButtonStyle = () => {

        if (isClickedStyle == "none"){
            setIsClickedStyle("line-through");
        }else{
            setIsClickedStyle("none");
        }
        adjustButtonText()
    }

    const adjustButtonText = () => {

        if (CheckMarkButton == "\u2610"){
            setCheckMarkButton("\u2705");
        }else{
            setCheckMarkButton("\u2610")
        }

    }

    let touchPropsExerciseButton = {
        style: styles.ExerciseButton,
       // onPress: () => adjustButtonStyle(),
        underlayColor: 'white'
    }

    let touchPropsCheckMarkButton = {
        style: styles.checkMarkButton,
       // onPress: () => adjustButtonStyle(),
        underlayColor: 'white'
    }

  const set = props.set;

  if (set != undefined){

            const set_with_ids = [];
            
            for (let i = 0; i < set.length; i++){
                set_with_ids.push({id: set[i], name: set[i]});
            }
            const curr_name = props.curr_name;
          
            
            return (
                <View>
                    {
                        set_with_ids.map((exercise) => {
                                return (
                                  
                                    <View key={exercise.id}>
                                        <TouchableHighlight
                                        {...touchPropsExerciseButton}
                                        >
                                
                                        <Text style={{ padding: 15, color: 'black', fontSize: 15,textDecorationLine: isClickedStyle, textDecorationColor: 'green',textAlign: 'left'}}>{exercise.name}</Text>
                                        </TouchableHighlight>
                                    </View>
                                )
                        })
                    }
                </View>
            )
  }else{
      return (

            <View>
                <Text>Loading ...</Text>
            </View>
      )
      
     
  }

}

const styles = StyleSheet.create({
    ExerciseButtonContainer: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkMarkButton:{
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,        
        width: 20,
        textAlign: 'center',
    },
    checkMarkBox:{
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 15
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row'
    },
    ExerciseButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        lineHeight: 1
    }
});