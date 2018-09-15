import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class List extends React.Component {

  componentDidMount() {
    let { query } = queryString.parse(this.props.location.search);
  }

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
