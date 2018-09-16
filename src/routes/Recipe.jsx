import React from 'react';
import queryString from '../lib/querystring';

const exampleRecipe = require('../exampleRecipe.json');

const getIngredients = (recipe) => {
  let steps = recipe.analyzedInstructions[0].steps;
  let ingredientsList = [];
  steps.forEach((step) => {
    step.ingredients.forEach((ingredient) => ingredientsList.push(ingredient.name));
  });
  ingredientsList = [...(new Set(ingredientsList))];
  return ingredientsList.reduce((prev, current) => `${prev}, ${current}`);
};
const getEquipment = (recipe) => {
  let steps = recipe.analyzedInstructions[0].steps;
  let equipmentList = [];
  steps.forEach((step) => {
    step.equipment.forEach((equipment) => equipmentList.push(equipment.name));
  });
  equipmentList = [...(new Set(equipmentList))];
  return equipmentList.reduce((prev, current) => `${prev}, ${current}`);
};
const getSteps = (recipe) => {
  let steps = recipe.analyzedInstructions[0].steps;
  return steps.map((step, index) => <p key={index}>Step {step.number}: {step.step}</p>);
};
const getBlurb = (recipe) => {
  return `This dish takes ${recipe.readyInMinutes} minutes to prepare
    and costs approximately $${recipe.pricePerServing} and serves ${recipe.servings}!`;
};

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      equipment: '',
      steps: [],
      blurb: '',
      img: '',
      fetching: true
    };
  }

  componentDidMount() {
    this.setState({ name: queryString.parse(this.props.location.search).name });
    new Promise((resolve, reject) => {
      setInterval(() => resolve(exampleRecipe), 1500);
    }).then((data) => {
      let ingredients = getIngredients(data);
      let equipment = getEquipment(data);
      let steps = getSteps(data);
      let blurb = getBlurb(data);
      this.setState({ fetching: false, blurb, ingredients, equipment, steps, img: data.image });
    });
  }

  render() {
    let { name, blurb, fetching, equipment, ingredients, steps, img } = this.state;
    if (!fetching) {
      return (
        <div>
          <h1>{name}</h1>
          <sub>{blurb}</sub>
          <div>
            <p>
              Ingredients: <i>{ingredients}</i><br/>
              Equipment: <i>{equipment}</i>
            </p>
          </div>
          <div>
            {steps}
          </div>
        </div>
      );
    }
    return <div><h1>{name}</h1></div>
  }
}

export default Recipe;
