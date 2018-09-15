import React from 'react';
import STYLE_CONSTS from '../style';

const cardDimension = 350;

const mainCard = {
  width: cardDimension + 'px',
  height: cardDimension + 'px',
  // margin: '20px 10px 20px',
  display: 'inline-block',
  // textAlign: 'center'
  boxShadow: "0 6px 12px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  borderRadius: "5px",
  margin: "20px",
  backgroundColor: "white",
  overflow: 'hidden'
};

const container = {
  padding: "2px 16px"
}

// const imgwrapper = {
//   width: '100%',
//   height: '100%',
//   overflow: 'hidden',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center'
// };


let totalMargin = 15;
let borderThickness = 2;
let marginThickness = totalMargin - borderThickness;

const img = {
  maxHeight: '100px',
  // margin: marginThickness + 'px',
  // border: borderThickness + 'px solid #BBBBBB',

  borderRadius: '5px',
  // position: 'absolute',
  // top: '50%',
  // transform: "translate(0, -50%)"
};

const RecipeCard = ({ recipe, onClick }) => {
  // return (
  //   <div style={mainCard} onClick={onClick}>
  //     <div style={imgwrapper}>
  //       <img style={img} src={`https://webknox.com/recipeImages/${recipe.id}-556x370.jpg`} /><br />
  //     </div>
  //     <div class='text'>
  //       <div class='title'>Sample title</div><br />
  //       <div class='time'>25 minutes</div>
  //       </div>
  //   </div>
  // );

  return (
    <div style={mainCard} onClick={onClick}>
      <img src={`https://webknox.com/recipeImages/${recipe.id}-556x370.jpg`} style={img}></img>
      <div style={container}>
        <h4><b>Sample Title That is Really Long Sample Title That is Really Long Sample Title That is Really Long Sample Title That is Really Long</b></h4> 
        <p>25 minutes</p> 
      </div>
    </div>
  )
};
export default RecipeCard;
