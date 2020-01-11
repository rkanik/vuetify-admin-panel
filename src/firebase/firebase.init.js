const firebase = require("firebase/app");
require("firebase/firestore");

import firebaseConfig from "./firebase.config";
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
