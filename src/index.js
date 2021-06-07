import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './slices/';

const reducer = combineReducers(reducers)

const store = configureStore({
  reducer,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
