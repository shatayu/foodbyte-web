import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {

  render() {
    return (
      <div>
        Search
        <ul>
          <li><Link to='/'>Login Page</Link></li>
          <li><Link to='/list'>List Page</Link></li>
          <li><Link to='/recipe'>Recipe Page</Link></li>
        </ul>
      </div>
    );
  }
  
}

export default Search;
