import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { USER_STATE_CHANGE } from '../constants/index'


//This function will call this in order to trigger database action
//fetchUser returns an action
export function fetchUser(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists){
                
                console.log('snapshot', snapshot)
                console.log('exists', snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot})
            }else{
                console.log("user id doesn't exist")
            }
        })
    })
}