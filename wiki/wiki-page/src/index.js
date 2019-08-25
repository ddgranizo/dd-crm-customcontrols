import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';


let baseName = "dd-crm-customcontrols"
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseName = ""
}
ReactDOM.render(<BrowserRouter basename={baseName}><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
