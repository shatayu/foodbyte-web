import React from 'react';
import {Star} from 'react-feather';
import STYLE_CONSTS from '../style.js';
let firebase = require('firebase/app');
require('firebase/database');

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

const text = {
  padding: "2px 16px",
  fontFamily: 'Helvetica'
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

const cardComponent = {
  position: 'relative',
  width: '100%',
  height: '50%'
}

const centeringContainer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
  width: '75%'
}

const starPos ={
  position: 'absolute',
  top: '5%',
  right: '3%'
}

const img = {
  maxHeight: '150px',
  marginTop: '30px'
  // margin: marginThickness + 'px',
  // border: borderThickness + 'px solid #BBBBBB',
};

const name = {
  color: 'black',
  fontFamily: 'helvetica'
}

const time = {
  fontFamily: 'helvetica',
  color: '#AAAAAA',
  position: 'absolute',
  bottom: '0px',
  left: '50%',
  transform: 'translateX(-50%)'
}
class RecipeCard extends React.Component{

  state={
    favClicked: false,
    key: ''
  };
  handleFavClick () {
    let {
      recipe
    }=this.props;
    if (this.state.favClicked==false)
    {
      this.setState({
        favClicked:true,
      });
      let uid = localStorage.getItem("uid");

      let firebaseObject = {
        id: recipe.id,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        title: recipe.title,
        timestamp: Date.now()
      }

      // store data Firebase
      if (this.state.key=='')
      {
        this.setState({
          key:firebase.database().ref().child('recipes').push().key
        });
      }
      let updates = {};
      updates[uid + '/favorites/' + this.state.key] = firebaseObject;

      firebase.database().ref().update(updates)
    } else {
      this.setState({
        favClicked:false,
      });
      this.props.removeItem(this.state.key);
    }
  }
  render(){
    let {recipe,
      onClick
    }=this.props;
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
      <div style={mainCard}>
        {/* <div style={outerContainer}>
        <div style={innerContainer}>
          <img src={`https://webknox.com/recipeImages/${recipe.id}-556x370.jpg`} style={img}></img>
          <div style={text}>
            <span style={name}>SAMPLE TITLE THAT IS REALLY LONG </span>
            <p style={time}>25 minutes</p>
          </div>
        </div>
        </div> */}
        <div style={cardComponent}>
          <Star
            size={20}
            style={starPos}
            onClick={this.handleFavClick.bind(this)}
            fill={this.state.favClicked?STYLE_CONSTS.COLORS.YELLOW:'white'}
          />
        <div style={centeringContainer} onClick={onClick}>
            <img src={`https://webknox.com/recipeImages/${recipe.id}-556x370.jpg`} style={img}></img>
          </div>
        </div>
        <div style={cardComponent}>
          <div style={centeringContainer} onClick={onClick}>
            <span style={name}>SAMPLE TITLE THAT IS REALLY LONG MEME MEME MEME  </span>
          </div>
          <p style={time}>25 minutes</p>
        </div>
      </div>
    )
  };
}
export default RecipeCard;
