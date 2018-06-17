/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './application.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />, document.body.appendChild(document.createElement('div')),
  );
});
