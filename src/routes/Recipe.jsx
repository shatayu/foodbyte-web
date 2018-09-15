import React from 'react';
import { Link } from 'react-router-dom';

class Recipe extends React.Component {

  render() {
    return (
      <div>
        Recipe
        <ul>
          <li><Link to='/search'>Search Page</Link></li>
          <li><Link to='/list'>List Page</Link></li>
          <li><Link to='/'>Login Page</Link></li>
        </ul>
      </div>
    );
  }
  
}

export default Recipe;
