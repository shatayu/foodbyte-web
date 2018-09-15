import React from 'react';
import STYLE_CONSTS from '../style';

const mainCard = {
  backgroundColor: STYLE_CONSTS.COLORS.WHITE,
  width: '75%',
  height: '25%',
  margin: '10px auto 10px'
};
const imgwrapper = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative'
};
const img = {
  maxHeight: '150px'
};

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div style={mainCard} onClick={onClick}>
      <span style={imgwrapper}>
        <img style={img} src={`https://webknox.com/recipeImages/${recipe.id}-556x370.jpg`} />
      </span>
    </div>
  );
};
export default RecipeCard;
