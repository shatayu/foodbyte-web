import React from 'react';
import queryString from '../lib/querystring';
import STYLE_CONSTS from '../style';
import { Clock, DollarSign, User, Zap } from 'react-feather';
import RecipeCard from '../components/RecipeCard';

let firebase = require('firebase/app');
require('firebase/database');

const exampleRecipe = require('../exampleRecipe.json');

const getIngredients = (recipe) => {
  if (recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps) {
    let steps = recipe.analyzedInstructions[0].steps;
    let ingredientsList = [];
    steps.forEach((step) => {
      step.ingredients.forEach((ingredient) => ingredientsList.push(ingredient.name));
    });
    ingredientsList = [...(new Set(ingredientsList))];
    return ingredientsList.length > 0 ? ingredientsList.reduce((prev, current) => `${prev}, ${current}`) : '';
  }
  return '';
};
const getEquipment = (recipe) => {
  if (recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps) {
    let steps = recipe.analyzedInstructions[0].steps;
    let equipmentList = [];
    steps.forEach((step) => {
      step.equipment.forEach((equipment) => equipmentList.push(equipment.name));
    });
    equipmentList = [...(new Set(equipmentList))];
    return equipmentList.length > 0 ? equipmentList.reduce((prev, current) => `${prev}, ${current}`) : '';
  }
  return '';
};
const getSteps = (recipe) => {
  if (recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps) {
    let steps = recipe.analyzedInstructions[0].steps;
    return steps.map((step, index) => <div key={index}><h2>Step {step.number}:</h2> {step.step}</div>);
  }
  return '';
};

const container = {
  width: '75%',
  margin: '30px auto 30px',
  textAlign: 'center',
  fontFamily: 'Helvetica'
};
const nameStyle = {
  fontSize: '4 em'
};
const imgStyle = {
  border: `solid 2px ${STYLE_CONSTS.COLORS.WHITE}`,
  borderRadius: '15px',
  maxHeight: '300px'
};
const dataSection = {
  position: 'absolute',
  top: '125px',
  left: '220px',
  textAlign: 'left',
  fontSize: '2em'
};
const titleSection = {
  textAlign: 'left'
};
const stepsSection = {
  textAlign: 'left'
};

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

const defaultState = {
  name: '',
  ingredients: '',
  equipment: '',
  steps: [],
  time: 0,
  price: 0,
  img: '',
  people: 0,
  fetching: true,
  id: 0,
  suggestions: []
};

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  suggestions() {
    let id = this.state.id;

    /* let similarDishPromises = new Promise((resolve, reject) => {
      let apiResult = [
        {
          "id": 736910,
          "title": "Char-Grilled Rib Eye with Roasted Shallot and Herb Butter",
          "readyInMinutes": 45,
          "image": "char-grilled-rib-eye-with-roasted-shallot-and-herb-butter-736910.jpeg",
          "imageUrls": [
            "char-grilled-rib-eye-with-roasted-shallot-and-herb-butter-736910.jpeg"
          ]
        },
        {
          "id": 144777,
          "title": "Argentinean Oak-Planked Beef Tenderloin With Chimichurri Sauce",
          "readyInMinutes": 45,
          "image": "argentinean-oak-planked-beef-tenderloin-with-chimichurri-sauce-2-144777.jpg",
          "imageUrls": [
            "argentinean-oak-planked-beef-tenderloin-with-chimichurri-sauce-2-144777.jpg",
            "argentinean_oak-planked_beef_tenderloin_with_chimichurri_sauce-144777.jpg"
          ]
        },
        {
          "id": 9027,
          "title": "Sous Vide Beef Tenderloin With Arugula Chimichurri Sauce",
          "readyInMinutes": 30,
          "image": "sous_vide_beef_tenderloin_with_arugula_chimichurri_sauce-9027.jpg",
          "imageUrls": [
            "sous_vide_beef_tenderloin_with_arugula_chimichurri_sauce-9027.jpg",
            "sous-vide-beef-tenderloin-with-arugula-chimichurri-sauce-2-9027.jpg"
          ]
        }
      ];

      resolve(apiResult);
    });*/

    let similarDishPromises = fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.state.id}/similar`, {
      headers: {
        'X-Mashape-Key': require('../config.json').apiKey,
        'Accept': 'application/json'
      }
    }).then((data) => {
      return data.json();
    });

    console.log(similarDishPromises);
    similarDishPromises
    .then((results) => {
      console.log("similarDishPromises resolved");
      let finalSuggestions = [];
      for (let i = 0; i < 3; i++) {
        let r = <RecipeCard key={i} recipe={results[i]} onClick={() => redirect(results[i])}/>
        finalSuggestions.push(r);
      }

      this.setState({suggestions: finalSuggestions});
    })
  }

  componentDidMount() {
    this.setState(defaultState);
    this.setState({
      name: queryString.parse(this.props.location.search).name,
      id: queryString.parse(this.props.location.search).id
    }, () => {
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.state.id}/information?includeNutrition=true`, {
        headers: {
          'X-Mashape-Key': require('../config.json').apiKey,
          'Accept': 'application/json'
        }
      }).then((data) => {
        return data.json();
      }).then((data) => {
        let ingredients = getIngredients(data);
        let equipment = getEquipment(data);
        let steps = getSteps(data);
        this.setState({
          fetching: false,
          time: data.readyInMinutes,
          ingredients,
          equipment,
          steps,
          img: data.image,
          people: data.servings,
          calories: Math.round(data.nutrition.nutrients[0].amount)
        });
        this.suggestions();
      });

    });
  }

  render() {
    let { name, time, fetching, equipment, ingredients, steps, img, price, people, calories } = this.state;
    if (!fetching) {
      return (
        <div style={container}>
          <img style={imgStyle} src={img} />
          <div style={dataSection}>
            <Clock />{`\t`}{time} minutes<br />
            <User />{`\t`}{people} people<br />
            <Zap />{`\t`}{calories} calories<br />
          </div>
          <div style={titleSection}>
            <h1 style={nameStyle}><u>{name}</u></h1>
            <p>Ingredients: <i>{ingredients}</i></p>
            <p>Equipment: <i>{equipment}</i></p>
          </div>
          <div style={stepsSection}>
            {steps}
          </div>
          <div id="memes">
            <div>
              {this.state.suggestions}
            </div>
          </div>
        </div>

      );
    }
    return <div style={container}><h1>{name}</h1></div>
  }
}

export default Recipe;
