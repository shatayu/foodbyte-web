import React from 'react';
import { Link } from 'react-router-dom';
import STYLE_CONSTS from '../style.js';
import { Home } from 'react-feather';

const HomeButton = () => {
  return (
    <Link to='/' style={{
      position: 'absolute',
      top: '15px',
      right: '15px',
      textDecoration: 'none'
    }}>
      <Home color={STYLE_CONSTS.COLORS.YELLOW} size={50} />
    </Link>
  );
};
export default HomeButton;
