import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';



export default function Exercise (props){

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
        onPress: () => adjustButtonStyle(),
        underlayColor: 'white'
    }

    let touchPropsCheckMarkButton = {
        style: styles.checkMarkButton,
        onPress: () => adjustButtonStyle(),
        underlayColor: 'white'
    }



    return (
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity {...touchPropsCheckMarkButton}>
                    <Text style={styles.checkMarkBox}>{CheckMarkButton}</Text>
                </TouchableOpacity>

                <TouchableHighlight
                {...touchPropsExerciseButton}
                >
            
                    <Text style={{ paddingTop: 15, color: 'black', fontSize: 15,textDecorationLine: isClickedStyle, textDecorationColor: 'green',textAlign: 'left'}}>{props.text}</Text>
                </TouchableHighlight>
            </View>
    )
}



const styles = StyleSheet.create({
    checkMarkButton:{
        backgroundColor: 'yellow',
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
        backgroundColor: 'yellow',
        borderRadius: 10,
        height: 50,
        width: 220,
        alignItems: 'center',
        lineHeight: 1
    }
});