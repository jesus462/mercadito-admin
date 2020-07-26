import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCuFWyKdrC2ayGlm6S5gb-4yfjfigHYW_0",
	authDomain: "mercadito-admin.firebaseapp.com",
	databaseURL: "https://mercadito-admin.firebaseio.com",
	projectId: "mercadito-admin",
	storageBucket: "mercadito-admin.appspot.com",
	messagingSenderId: "527114009156",
	appId: "1:527114009156:web:3cecbee4a3486627cd9a11",
	measurementId: "G-XW043DJ8K6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
