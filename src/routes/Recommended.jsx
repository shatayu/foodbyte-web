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

    let meal = firebase.database().ref(uid + "/mealplan");
    
      meal.on('value', (snapshot) => {
        let mealValue = snapshot.val();
        if (mealValue) {
          let recipes = mealValue.recipes.map((meal, index) => {
            return <RecipeCard key={index} recipe={meal} onClick={() => redirect(meal)} />;
          });
          this.setState({ recipes, fetching: false });
        } else {
          this.generateMealPlan.call(this);
        }
      })

  }

  generateMealPlan() {
    let uid = localStorage.getItem("uid");
    let updates = {};
      // Fetch profile
      let profile = firebase.database().ref(uid + '/profile');
      if (profile) {
        profile.on('value', (snapshot) => {
          let profileValue = snapshot.val();
          fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=${profileValue.diet}&exclude=${profileValue.excluded}&targetCalories=${profileValue.calories}&timeFrame=day`,
          {
            headers: {
              'X-Mashape-Key': '6aGSnelJ44mshYgdX2miZaUN8OAip1Vq2ZDjsnlrc9irpPowAd',
              'Accept': 'application/json'
            }
          }).then((data) => {
            return data.json();
          }).then((data) => {
            let mealPlan = {
              recipes: data.meals
            };
            if (data.meals) {
              let recipes = data.meals.map((meal, index) => {
                return <RecipeCard key={index} recipe={meal} onClick={() => redirect(meal)} />;
              });
              this.setState({ recipes, fetching: false }, () => {
                updates[uid + '/mealplan'] = mealPlan;
                firebase.database().ref().update(updates);
              })
            }
          });
        });
      }
  }

  render() {
    let { fetching, recipes } = this.state;
    return (
      <div style = {{
        textAlign: 'center'
      }}>
        <StatusMessage status={fetching} />
        <div>
          {fetching ? '' : recipes.length > 0 ? recipes : 'No profile to generate a meal plan' }
          <br />
          { recipes.length > 0 ? <button onClick={this.generateMealPlan.bind(this)}>Generate New Meal Plan</button> : '' }
        </div>
      </div>
    );
  }

}
export default Recommended;
