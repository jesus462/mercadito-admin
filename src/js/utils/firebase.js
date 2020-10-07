import firebase from "firebase";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDzBuWzJxCOkXKTqcnDzzwdVoSE4xFDQEk",
	authDomain: "mercadito-web.firebaseapp.com",
	databaseURL: "https://mercadito-web.firebaseio.com",
	projectId: "mercadito-web",
	storageBucket: "mercadito-web.appspot.com",
	messagingSenderId: "270843247766",
	appId: "1:270843247766:web:912fd5990e9f0ac9bcd6b7",
	measurementId: "G-8L0SNEXHPP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
