import React from 'react';
import StatusMessage from '../components/StatusMessage.jsx';
import RecipeCard from '../components/RecipeCard';

let firebase = require('firebase/app');
require('firebase/database');

let firebaseCredentials = require('../firebaseCredentials');

const redirect = (recipe) => {
  // store recipe and timestamp in firebase
  let uid = localStorage.getItem("uid");

  let firebaseObject = {
    id: recipe.id,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    title: recipe.title,
    timestamp: Date.now()
  }

  // store data Firebase
  let key = firebase.database().ref().child('recipes').push().key;

  let updates = {};
  updates[uid + '/history/' + key] = firebaseObject;

  firebase.database().ref().update(updates).then(() => {
    // redirect user
    window.location.href = `/recipe?id=${recipe.id}&name=${recipe.title}`;
  });

};

class Recommended extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      fetching: true, 
      recipes: [],
      markedForDeletion: false
    };
  };

  componentDidMount() {
    let config = firebaseCredentials.default;
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let uid = localStorage.getItem("uid");

    let history = firebase.database().ref(uid + "/history");
    history.on('value', (snapshot) => {
      let firebaseHistory = snapshot.val();

      // store cards in state, render them
      let recipes = [];
      if (firebaseHistory) {
        Object.keys(firebaseHistory).forEach((key, index) => {
          //console.log(firebaseHistory[key]);
          recipes.push(<RecipeCard key={index} recipe={firebaseHistory[key]} onClick={() => redirect(firebaseHistory[key])}/>)
        });
        recipes = recipes.reverse();
        this.setState({ recipes, fetching: false });
      } else {
        this.setState({ fetching: false, recipes: [] })
      }

    })
  }

  render() {
    let { fetching, recipes } = this.state;
    return (
      <div style = {{
        textAlign: 'center'
      }}>
        <StatusMessage status={fetching} />
        <div>
          {fetching ? '' : recipes.length > 0 ? recipes : 'No history to display' }
        </div>
      </div>
    );
  }

}
export default Recommended;
