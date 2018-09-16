import React from 'react';
import queryString from '../lib/querystring';
import STYLE_CONSTS from '../style';
import { Clock, DollarSign, User } from 'react-feather';

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
  return steps.map((step, index) => <div key={index}><h4>Step {step.number}:</h4> {step.step}</div>);
};

const container = {
  width: '75%',
  margin: '30px auto 30px',
  textAlign: 'center',
  fontFamily: 'Helvetica'
};
const imgStyle = {
  border: `solid 2px ${STYLE_CONSTS.COLORS.WHITE}`,
  borderRadius: '15px',
  maxHeight: '300px'
};
const dataSection = {
  position: 'absolute',
  top: '125px',
  right: '300px',
  textAlign: 'left',
  fontSize: '2em'
};
const titleSection = {
  textAlign: 'left'
};
const stepsSection = {
  textAlign: 'left'
};

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      equipment: '',
      steps: [],
      time: 0,
      price: 0,
      img: '',
      people: 0,
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
      this.setState({
        fetching: false,
        time: data.readyInMinutes,
        ingredients,
        equipment,
        steps,
        img: data.image,
        price: data.pricePerServing,
        people: data.servings
      });
    });
  }

  render() {
    let { name, time, fetching, equipment, ingredients, steps, img, price, people } = this.state;
    if (!fetching) {
      return (
        <div style={container}>
          <img style={imgStyle} src={img} />
          <div style={dataSection}>
            <Clock />{time} minutes<br />
            <DollarSign />{price}<br />
            <User />{people} people<br />
          </div>
          <div style={titleSection}>
            <h2><u>{name}</u></h2>
            <p>Ingredients: <i>{ingredients}</i></p>
            <p>Equipment: <i>{equipment}</i></p>
          </div>
          <div style={stepsSection}>
            {steps}
          </div>
        </div>
      );
    }
    return <div style={container}><h1>{name}</h1></div>
  }
}

export default Recipe;
