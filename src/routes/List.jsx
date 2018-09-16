import React from 'react';
import queryString from '../lib/querystring';
import StatusMessage from '../components/StatusMessage.jsx';
import RecipeCard from '../components/RecipeCard';

let firebase = require('firebase/app');
require('firebase/database');

let config = {
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

const exampleResults = require('../exampleQuery.json');

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
  })

};

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fetching: true, recipes: [] };
  }

  componentDidMount() {
    let { query } = queryString.parse(this.props.location.search);
    new Promise((resolve, reject) => {
      setInterval(() => resolve(exampleResults), 1500);
    }).then((data) => {
      let recipes = data.results.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} onClick={() => redirect(recipe)}/>
      ));
      this.setState({ recipes, fetching: false });
    });
  }

  render() {
    let { fetching, recipes } = this.state;
    return (
      <div style = {{
        textAlign: 'center'
      }}>
        <StatusMessage status={fetching} />
        <div>
          {recipes}
        </div>
      </div>
    );
  }
  
}

export default List;
