import firebase from 'firebase' //sets up using firestore in this application
import firestore from 'firebase/firestore'
 
 
 // Initialize Firebase
var config = {
    apiKey: "REMOVED",
    authDomain: "udemy-geo-ninjas-10f47.firebaseapp.com",
    databaseURL: "https://udemy-geo-ninjas-10f47.firebaseio.com",
    projectId: "udemy-geo-ninjas-10f47",
    storageBucket: "udemy-geo-ninjas-10f47.appspot.com",
    messagingSenderId: "1032119919249"
  };

const firebaseApp = firebase.initializeApp(config);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })


export default firebaseApp.firestore()


