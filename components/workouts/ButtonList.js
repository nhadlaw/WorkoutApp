import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground} from 'react-native';

import {YuseiMagic_400Regular } from '@expo-google-fonts/yusei-magic';
import { MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';
import * as Font from 'expo-font'


export default function ButtonList() {
  return (
            <View style={styles.TypeSwimButtons}>

                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'hrt_rate_180'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Heart Rate 180</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'distance free'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Distance Freestyle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'IM'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>IM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'stroke choice'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Stroke Choice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'kick'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Kick</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'Pull'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Pull</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'Kick/Pull'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Kick/Pull</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'Vo2 max'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Vo2 Max</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'Speed 50/100'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Speed 50/100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({type_of_swim_workout: 'Speed 200/400'})}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Speed 200/400</Text>
                    </TouchableOpacity>
            </View>
  )
}

const styles = StyleSheet.create({ 

    TypeSwimButtons: {
        alignContent: 'center',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 30,
        marginRight: 40,
        marginLeft: 40,
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
})