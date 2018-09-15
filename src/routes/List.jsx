import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {

  render() {
    return (
      <div>
        List
        <ul>
          <li><Link to='/search'>Search Page</Link></li>
          <li><Link to='/'>Login Page</Link></li>
          <li><Link to='/recipe'>Recipe Page</Link></li>
        </ul>
      </div>
    );
  }
  
}

export default List;
