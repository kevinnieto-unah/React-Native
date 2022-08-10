import app from 'firebase/app'; /* dds*/
//import firebaseConfig from './config';
import 'firebase/firestore'/* dds*/


const firebaseConfig = {
    apiKey: "AIzaSyCjXiXtiXuLPMUPOQeuzKlBnvXEjKJ7P9k",
    authDomain: "restaurant-ca3ed.firebaseapp.com",
    projectId: "restaurant-ca3ed",
    storageBucket: "restaurant-ca3ed.appspot.com",
    messagingSenderId: "766713955660",
    appId: "1:766713955660:web:5ba42cf81dbce60ca7fbe9",
    measurementId: "G-L4NPM1RQQ6"
  };

class Firebase{
    constructor(){
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
            app.firestore().settings({ experimentalForceLongPolling: true });
         }
        this.db=app.firestore()
    }
   
}

const firebase = new Firebase();
export default firebase;