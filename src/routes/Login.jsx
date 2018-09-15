import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
  login() {
    console.log("Attempting to log in with Google");

    // basic firebase setup
    var config = {
      apiKey: "AIzaSyBbOoyLRRY37emkwn4pkcanS_0LGbKQMpY",
      authDomain: "foodbyte-ea563.firebaseapp.com",
      databaseURL: "https://foodbyte-ea563.firebaseio.com",
      projectId: "foodbyte-ea563",
      storageBucket: "foodbyte-ea563.appspot.com",
      messagingSenderId: "13360444459"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }

    // authenticate
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  render() {
    return (
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <button id="login" 
          onClick={() => {this.login()}}
          style = {
            {
              width: "500px",
              height: "200px",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          }
        >
          Login
        </button>
      </div>
    );
  }
  
}

export default Login;
