import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routes from './routes/index';

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>, 
  document.getElementById('root')
);
