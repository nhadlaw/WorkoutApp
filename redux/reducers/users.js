import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//thunkMiddleware allows us to have action creators that return functions
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const initialState = {
    currentUser: null
}

//reducers are storing the state and updating it whenever they see an action
//when the type is "setCurrentUser" we return a new state where
//currentUser is chagned to the action.value which will update our state and anywhere
//in the app that is accessing data
const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "setCurrentUser":
            return {
                ...state,
                currentUser: action.value,
            };
        default:
            return state;
    }
    
}

const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
export { store };

//
//Action Creators: contain information on how to update the state
//we are creating an action creator below that will update our
//state.currentUser object
//

const setCurrentUser = (currentUser) => {
    return {
        type:"setCurrentUser",
        value: currentUser
    }
}


const fetchUser = () => {

    let currentUser = firebase.auth().currentUser

    if (currentUser != null){

        return function(dispatch) {
            firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    //console.log('snapshot data', snapshot.data())
                    var currentUser = snapshot.data();
                    var actionSetCurrentUser = setCurrentUser(currentUser);
                    dispatch(actionSetCurrentUser) 
                }else{
                    console.log("user id doesn't exist")
                }
            })
        }
    }


}

export {setCurrentUser, fetchUser};