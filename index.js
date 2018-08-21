import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import App from './App.js';//the dot in dot slash indicates the current directory
ReactDOM.render((<HashRouter>
    <App/>
    </HashRouter>), document.getElementById('root'));

