import React from 'react';
import style from './statusMessage';

const StatusMessage = ({ status }) => {
  let message = status ? 'We are fetching your recipes!' : '';
  return <div style={style}>{message}</div>;
};
export default StatusMessage;
