import React from 'react';
import { Link } from 'react-router-dom';
import STYLE_CONSTS from '../style.js';

const HomeButton = () => {
  return (
    <Link to='/' style={{
      position: 'absolute',
      top: '15px',
      right: '15px'
    }}>
      <img src={require('../home.svg')} style={{
        height: '62.5px'
      }}/>
    </Link>
  );
};
export default HomeButton;
