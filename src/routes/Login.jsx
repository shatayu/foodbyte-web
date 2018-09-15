import React from 'react';
let firebase = require("firebase/app");
let style = require("../style");
require("firebase/auth");

class Login extends React.Component {
  login() {
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

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      localStorage.setItem("email", user.email);
      if (user.email != null) {
        window.open("search", "_self");
      }
      // ...
    }).catch(function (error) {
      // // Handle Errors here.
      // console.log(error);
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });

  }

  render() {
    console.log(localStorage.getItem("email"));
    if (localStorage.getItem("email") != null) {
      window.open("search", "_self");
    }

    return (
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <button id="login"
          onClick={() => { this.login() }}
          onMouseEnter={() => {
            let button = document.getElementById("login");
            button.style.borderColor = style.default.COLORS.WHITE,
              button.style.color = style.default.COLORS.WHITE
          }}
          onMouseLeave={() => {
            let button = document.getElementById("login");
            button.style.borderColor = style.default.COLORS.YELLOW,
              button.style.color = style.default.COLORS.YELLOW
          }}
          style={
            {
              width: "500px",
              height: "120px",
              backgroundColor: style.default.COLORS.PINK,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              borderRadius: "35px",
              border: "10px solid " + style.default.COLORS.YELLOW,

              color: style.default.COLORS.YELLOW,
              fontSize: "30px"
            }
          }
        >
          LOG IN WITH GOOGLE
        </button>
      </div>
    );
  }

}

export default Login;
