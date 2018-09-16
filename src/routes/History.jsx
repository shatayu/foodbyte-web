import React from 'react';
import StatusMessage from '../components/StatusMessage.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

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

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true, recipes: [] };
  };

  componentDidMount() {
    // let { query } = queryString.parse(this.props.location.search);
    // new Promise((resolve, reject) => {
    //   setInterval(() => resolve(""), 1500);
    // }).then((data) => {
    //   // let recipes = data.results.map((recipe, index) => (
    //   //   // <RecipeCard key={index} recipe={recipe} onClick={() => redirect(recipe)}/>
    //   // ));
    //   let recipes = [];
    //   this.setState({ recipes, fetching: false });
    // });


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

    // let data; // firebase data
    // let recipes = data.results.map((recipe, index) => (
    //   <RecipeCard key={index} recipe={recipe} onClick={() => redirect(recipe)}/>
    // ));
    // this.setState({ recipes, fetching: false });
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
export default History;
