import React from 'react';
import Autocomplete from 'react-autocomplete';
import STYLE_CONSTS from '../style.js';

let firebase = require('firebase/app');
require('firebase/database');

let firebaseCredentials = require('../firebaseCredentials');

const submitToFirebase = (firebaseObject) => {
  // store recipe and timestamp in firebase
  let uid = localStorage.getItem("uid");
  console.log(firebaseObject);
  // store data Firebase
  firebase.database().ref(uid + '/profile/').set(firebaseObject);
};

const submitStyling = {
  width: "500px",
  height: "80px",
  backgroundColor: STYLE_CONSTS.COLORS.PINK,

  borderRadius: "35px",
  border: "10px solid " + STYLE_CONSTS.COLORS.YELLOW,

  color: STYLE_CONSTS.COLORS.YELLOW,
  fontSize: "30px",
  marginTop: "50px"
}

const containerStyling = {
  width: '30%',
  height: 'auto',
  backgroundColor: 'white',
  margin: '20px',
  padding: '10px',
  color: 'black',
  borderRadius: '10px',
  boxShadow: "0 6px 12px 0 rgba(0,0,0,0.2)",
  marginLeft: "50%",
  transform: "translate(-50%, 0%)"
}


const profileStyling= {
 fontSize: '80px',
 fontFamily: 'helvetica'
}

const dietStyling= {
  fontSize: '30px',
  fontFamily: 'helvetica',
}


const categoryStyling= {
  fontSize: '30px',
  fontFamily: 'helvetica',
}

const textStyling = {
  fontSize: '1em',
  margin: '1em 1em 1em 1em',
  padding: '10px',
  width: '70%',
  height: '1.25em',

  borderRadius: '0.5em',
  border: '2px solid black'
}

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { diet: '', calories: 0, excluded: '' };
  }

  saveConfig(e) {
    e.preventDefault();
    submitToFirebase(this.state);
  }

  componentDidMount() {
    let config = firebaseCredentials.default;
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let uid = localStorage.getItem("uid");
    let firebaseRef = firebase.database().ref(uid + "/profile");
    firebaseRef.once("value").then((snapshot) => {
      console.log(snapshot.val());
      this.setState({
        calories: snapshot.val().calories,
        diet: snapshot.val().diet,
        excluded: snapshot.val().excluded
      })
    })

  }

  render() {
    return (
      <form onSubmit={this.saveConfig.bind(this)}>
        <div style={{textAlign: "center", position: "relative", marginTop: "100px"}}>
          <div style={containerStyling}>
            <span style={categoryStyling}>Target Calories</span><br/>
            <input id="caloriesBox"
              style={textStyling}
              onFocus={() => {
                let textbox = document.getElementById("caloriesBox");
                textbox.style.outline = "none";
              }}
              type='text'
              value={this.state.calories}
              onChange={(e) => this.setState({
                calories: e.target.value
              })}
              />
          </div>
          <div style={containerStyling}>
            <span style={categoryStyling}>Excluded Items</span><br/>
            <input id="excludeBox"
              style={textStyling}
              onFocus={() => {
                let textbox = document.getElementById("excludeBox");
                textbox.style.outline = "none";
              }}
              type='text'
              value={this.state.excluded}
              onChange={(e) => this.setState({ excluded: e.target.value })} 
            />
          </div>
          <div style={containerStyling}>
            <span style={dietStyling}>Diet</span><br/>
            <input id="dietBox"
              style={textStyling}
              onFocus={() => {
                let textbox = document.getElementById("dietBox");
                textbox.style.outline = "none";
              }}
              type='text'
              value={this.state.diet}
              onChange={(e) => this.setState({ diet: e.target.value })} 
            />
          </div>
          <button type='submit' style={submitStyling}>SUBMIT</button>
        </div>
      </form>
    );
  }

}
export default Profile;
