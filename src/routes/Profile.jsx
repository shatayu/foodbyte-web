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

const profileStyling= {
 fontSize: '80px',
 fontFamily: 'helvetica',
 color: STYLE_CONSTS.COLORS.YELLOW
}

const dietStyling= {
  fontSize: '30px',
  fontFamily: 'helvetica',
  color: STYLE_CONSTS.COLORS.YELLOW
}


const categoryStyling= {
  fontSize: '30px',
  fontFamily: 'helvetica',
  color: STYLE_CONSTS.COLORS.YELLOW
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
        <span style={profileStyling}>Profile</span>
        <div>
          <span style={dietStyling}>Diet</span><br/>
          <Autocomplete
            getItemValue={(item) => item}
            items={[
              //pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
              'pescatarian',
              'lacto vegetarian',
              'ovo vegetarian',
              'vegan',
              'vegetarian'
            ]}
            renderItem={(item, isHighlighted) => {
              return (
                <p>{item}</p>
              );
            }}
            value={this.state.diet}
            onChange={(e) => this.setState({diet: e.target.value}) }
            onSelect={(val) => this.setState({ diet: val}) }
              />
        </div>
        <div>
          <span style={categoryStyling}>Target Calories</span><br/>
          <input
            type='text'
            value={this.state.calories}
            onChange={(e) => this.setState({
              calories: e.target.value
            })}
            />
        </div>
        <div>
          <span style={categoryStyling}>Excluded Items</span><br/>
          <input
            type='text'
            value={this.state.excluded}
            onChange={(e) => this.setState({ excluded: e.target.value })} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }

}
export default Profile;
