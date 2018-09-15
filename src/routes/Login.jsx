import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

  render() {
    return (
      <div>
        Login
        <ul>
          <li><Link to='/search'>Search Page</Link></li>
          <li><Link to='/list'>List Page</Link></li>
          <li><Link to='/recipe'>Recipe Page</Link></li>
        </ul>
      </div>
    );
  }
  
}

export default Login;
