import React from 'react';
import StatusMessage from '../components/StatusMessage.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import STYLE_CONSTS from '../style.js';

const favoritesStyling= {
 position: 'absolute',
 top: '50%',
 left: '50%',
 fontSize: '80px',
 fontFamily: 'helvetica',
 color: STYLE_CONSTS.COLORS.YELLOW,
 transform: "translateX(-50%)"
}

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

class Favorites extends React.Component {
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

    let favorites= firebase.database().ref(uid + "/favorites");
    favorites.on('value', (snapshot) => {
      let firebaseFavorites = snapshot.val();

      // store cards in state, render them
      let recipes = [];
      if (firebaseFavorites) {
        Object.keys(firebaseFavorites).forEach((key, index) => {
          firebaseFavorites[key].key = key;
          recipes.push(<RecipeCard key={index} recipe={firebaseFavorites[key]} onClick={() => redirect(firebaseFavorites[key])}/>)
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
          {fetching ? '' : recipes.length > 0 ? recipes : <span style={favoritesStyling}>No favorites to display</span> }
        </div>
      </div>
    );
  }
}
export default Favorites;
