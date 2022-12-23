import React from 'react';
import ReactDOM from 'react-dom/client';
import { /*BrowserRouter*/HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './App';
import store from './reduxStore';

import "biings-ds/build/bds.css";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);