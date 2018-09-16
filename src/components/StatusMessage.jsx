import React from 'react';
let style = require('../style');

const StatusMessage = ({ status }) => {
  let message = status ? 'We are fetching your recipes!' : '';

  let loading = {
    fontSize: '32px',
    fontFamily: 'helvetica',
    color: style.default.COLORS.YELLOW
  }

  let container = {
    textAlign: 'center',
    color: style.default.COLORS.WHITE,
    posiion: 'relative',
    width: '70%',
    height: '70%'
  };

  let inner = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    
    fontSize: '30px',
    fontFamily: 'helvetica',
    color: style.default.COLORS.YELLOW
  }

  console.log("status is " + status);
  if (!status) {
    return (<div style={container}>
      <div style={inner}>
        {''}
      </div>
    </div>);
  } else {
    return (<div style={container}>
      <div style={inner}>
        <span style={loading}>LOADING...</span>
      </div>
    </div>);
  }

};
export default StatusMessage;
