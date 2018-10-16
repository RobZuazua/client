/*
Author: Robbie Zuazua
Date: 10/16/18
Info: Notable Calendar Challenge Frontend
*/
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Import Style for ReactStrap elements 
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App/App';

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
