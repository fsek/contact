/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Router';
import './application.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />,
    document.body.appendChild(document.createElement('div')),
  );
});
