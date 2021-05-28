import React from 'react';

const AlertMessage = ({ message = '', type = '' }) => {
  return <div className={`message ${type}`}>{message}</div>;
};

export default AlertMessage;
