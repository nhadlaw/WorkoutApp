import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function CardioButton (props){

   const [isClickedStyle, setIsClickedStyle] = React.useState("");
   const [CheckMarkButton, setCheckMarkButton] = React.useState("")


   const adjustButtonStyle = () => {

        if (isClickedStyle == ""){
            setIsClickedStyle("line-through");
        }else{
            setIsClickedStyle("");
        }
        adjustButtonText()
    }

    const adjustButtonText = () => {

        if (CheckMarkButton == ""){
            setCheckMarkButton(`\u2705`);
        }else{
            setCheckMarkButton("")
        }

    }

    var touchProps = {
        style: styles.CardioButton,
        onPress: () => adjustButtonStyle(),
        underlayColor: 'white'
    }


    return (
        <View style={styles.container}>
            
            <View>
                <TouchableHighlight
                    onPress={() => this.setState({type_of_cardio: "Running Workout"})}
                    style={styles.CardioButton}
                >
                <Image 
                    source={require('../../FitnessAppPics/RunFigure.png')} 
                    style={styles.RunImage}
                />
                </TouchableHighlight>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    checkMarkButton:{
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        padding: 7,
        marginTop: 5,
        width: 50
    },
    CardioButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        padding: 7,
        marginTop: 5,
        width: 300
    },
    CardioCompletedText:{
        textDecorationLine: 'line-through',
        color: 'black',
        fontSize: 20
    },
    CardioUncompletedText:{
       fontSize: 17,
       color: 'black'
    }

});
